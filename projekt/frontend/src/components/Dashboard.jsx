import React, { useState, useEffect, useRef } from "react";
import { IoChevronDown, IoCloseCircleOutline } from "react-icons/io5";
import "./Dashboard.css";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const Dashboard = () => {
  const [mileageFrom, setMileageFrom] = useState(""); // Stan dla "Przebieg od"
  const [mileageTo, setMileageTo] = useState(""); // Stan dla "Przebieg do"
  const [fuelTypes, setFuelTypes] = useState({
    benzyna: false,
    diesel: false,
    gaz: false,
  });
  const [showFuelOptions, setShowFuelOptions] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(""); // Wybrana marka
  const [selectedModel, setSelectedModel] = useState(""); // Wybrany model
  const [models, setModels] = useState([]); // Modele dostępne dla marki
  const [activeFilter, setActiveFilter] = useState("all"); // Stan dla aktywnego filtra
  const fuelTypeRef = useRef(null); // Referencja do kontenera opcji rodzaju paliwa
  const [selectedBodyType, setSelectedBodyType] = useState(""); // Wybrany typ nadwozia

  // Obsługa kliknięcia poza rodzaj paliwa
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fuelTypeRef.current && !fuelTypeRef.current.contains(e.target)) {
        setShowFuelOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Obsługa zmiany paliwa
  const handleFuelChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setFuelTypes({
        benzyna: checked,
        diesel: checked,
        gaz: checked,
      });
    } else {
      setFuelTypes((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  // Liczba wybranych paliw
  const selectedFuelCount = Object.values(fuelTypes).filter(Boolean).length;

  // Zresetowanie wyboru paliw
  const handleClearFuelSelection = () => {
    setFuelTypes({
      benzyna: false,
      diesel: false,
      gaz: false,
    });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  })).filter(option => option.value >= 1990 || option.value % 10 === 0);

  // Opcje przebiegu (25 000, 50 000, ..., 250 000 km)
  const mileageOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 25000);

  const formatMileage = (mileage) => {
    if (!mileage) return "";
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleCustomValue = (inputValue, setter) => {
    const cleanedValue = inputValue.replace(/[^\d]/g, ''); // Usuń znaki nienumeryczne
    if (cleanedValue) {
      setter({ label: `${formatMileage(cleanedValue)} km`, value: parseInt(cleanedValue, 10) });
    }
  };


  // Obsługa zmiany wartości "Rok produkcji od"
  const handleYearFromChange = (selectedOption) => {
    if (yearTo && selectedOption?.value > yearTo.value) {
      setYearTo(null); // Wyczyść "Rok produkcji do", jeśli "od" > "do"
    }
    setYearFrom(selectedOption);
  };

  // Obsługa zmiany wartości "Rok produkcji do"
  const handleYearToChange = (selectedOption) => {
    if (yearFrom && selectedOption?.value < yearFrom.value) {
      setYearFrom(null); // Wyczyść "Rok produkcji od", jeśli "do" < "od"
    }
    setYearTo(selectedOption);
  };


  // const handleMileageChange = (e, setter) => {
  //   const value = e.target.value.replace(/[^\d]/g, ""); // Usuń spacje i znaki
  //   setter(value); // Ustaw czystą wartość w stanie
  // };


  // Obsługa zmiany wartości "Przebieg od"
  const handleMileageFromChange = (option) => {
    if (mileageTo && option?.value > mileageTo.value) {
      setMileageTo(null); // Wyczyść "Przebieg do", jeśli wartość "od" jest większa
    }
    setMileageFrom(option);
  };

  // Obsługa zmiany wartości "Przebieg do"
  const handleMileageToChange = (option) => {
    if (mileageFrom && option?.value < mileageFrom.value) {
      setMileageFrom(null); // Wyczyść "Przebieg od", jeśli wartość "do" jest mniejsza
    }
    setMileageTo(option);
  };


  // Ustawienie modeli pojazdu w zależności od wybranej marki
  const handleBrandChange = (selectedOption) => {
    const brand = selectedOption ? selectedOption.value : "";
    setSelectedBrand(brand);
    setSelectedModel(""); // Resetujemy model przy zmianie marki

    // Ustaw dostępne modele w zależności od wybranej marki
    if (brand === "Audi") {
      setModels([
        { value: "A3", label: "A3" },
        { value: "A4", label: "A4" },
        { value: "A6", label: "A6" },
      ]);
    } else if (brand === "BMW") {
      setModels([
        { value: "Series 3", label: "Series 3" },
        { value: "Series 5", label: "Series 5" },
        { value: "Series 7", label: "Series 7" },
      ]);
    } else {
      setModels([]); // Brak modeli dla nieznanej marki
    }
  };

  // Zmieniamy wybrany model
  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption ? selectedOption.value : "");
  };

  // Funkcja obsługująca kliknięcie przycisku filtra
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };


  const [yearFrom, setYearFrom] = useState(null); // Rok produkcji od
  const [yearTo, setYearTo] = useState(null); // Rok produkcji do

  // Zmieniamy typ nadwozia
  const handleBodyTypeChange = (selectedOption) => {
    setSelectedBodyType(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Wyszukaj Pojazd</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Wprowadź słowo kluczowe"
            className="search-input"
          />
          <input type="text" placeholder="VIN" className="search-input" />

          <div className="search-input-group">
            {/* Rok produkcji od */}
            <div className="select-wrapper">
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={yearFrom}
                onChange={handleYearFromChange}
                options={yearOptions}
                placeholder="Rok produkcji od"
                isClearable
                isSearchable
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  control: (base, state) => ({
                    ...base,
                    width: '200px',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    height: '42px',
                    borderColor: state.isFocused ? 'black' : '#ccc',
                    '&:hover': {
                      borderColor: state.isFocused ? 'black' : '#ccc',
                    },
                    borderWidth: '2px',
                    textAlign: 'left',
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                }}
              />
            </div>

            {/* Rok produkcji do */}
            <div className="select-wrapper">
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={yearTo}
                onChange={handleYearToChange}
                options={yearOptions}
                placeholder="Rok produkcji do"
                isClearable
                isSearchable
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  control: (base, state) => ({
                    ...base,
                    width: '200px',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    height: '42px',
                    borderColor: state.isFocused ? 'black' : '#ccc',
                    '&:hover': {
                      borderColor: state.isFocused ? 'black' : '#ccc',
                    },
                    borderWidth: '2px',
                    textAlign: 'left',
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                }}
              />
            </div>
          </div>

          <div className="search-input-group">
            {/* Przebieg od */}
            <div className="select-wrapper">
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={mileageFrom}
                onChange={handleMileageFromChange}
                onCreateOption={(inputValue) => handleCustomValue(inputValue, setMileageFrom)}
                options={mileageOptions.map((mileage) => ({
                  label: (
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>{formatMileage(mileage)}</span>
                      <span style={{ marginLeft: 'auto', paddingLeft: '10px' }}>km</span>
                    </div>
                  ),
                  value: mileage,
                }))}
                placeholder="Przebieg od (km)"
                isClearable
                isSearchable={true}
                formatCreateLabel={() => ''} // Usuń napis "Create"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  control: (base, state) => ({
                    ...base,
                    width: '200px',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    height: '42px',
                    borderColor: state.isFocused ? 'black' : '#ccc',
                    '&:hover': {
                      borderColor: state.isFocused ? 'black' : '#ccc',
                    },
                    borderWidth: '2px',
                    textAlign: 'left',
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                }}
              />
            </div>

            {/* Przebieg do */}
            <div className="select-wrapper">
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={mileageTo}
                onChange={handleMileageToChange}
                onCreateOption={(inputValue) => handleCustomValue(inputValue, setMileageTo)}
                options={mileageOptions.map((mileage) => ({
                  label: (
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>{formatMileage(mileage)}</span>
                      <span style={{ marginLeft: 'auto', paddingLeft: '10px' }}>km</span>
                    </div>
                  ),
                  value: mileage,
                }))}
                placeholder="Przebieg do (km)"
                isClearable
                isSearchable={true}
                formatCreateLabel={() => ''} // Usuń napis "Create"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  control: (base, state) => ({
                    ...base,
                    width: '200px',
                    borderRadius: '5px',
                    boxShadow: 'none',
                    height: '42px',
                    borderColor: state.isFocused ? 'black' : '#ccc',
                    '&:hover': {
                      borderColor: state.isFocused ? 'black' : '#ccc',
                    },
                    borderWidth: '2px',
                    textAlign: 'left',
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: 'darkgray',
                    ':hover': {
                      color: 'black',
                    },
                  }),
                }}
              />
            </div>
          </div>



          {/* Rodzaj paliwa */}
          <div className="fuel-type-container" ref={fuelTypeRef}>
            <div
              className="fuel-type-label"
              onClick={() => setShowFuelOptions(!showFuelOptions)}
            >
              Rodzaj paliwa
              {selectedFuelCount > 0 && (
                <div className="fuel-count">
                  {selectedFuelCount}
                </div>
              )}
              {/* Zmieniamy ikonę w zależności od tego, czy paliwa zostały wybrane */}
              {selectedFuelCount > 0 ? (
                <IoCloseCircleOutline
                  className="fuel-type-icon"
                  onClick={handleClearFuelSelection}
                />
              ) : (
                <IoChevronDown
                  className={`fuel-type-icon ${showFuelOptions ? "open" : ""}`}
                />
              )}
            </div>
            {showFuelOptions && (
              <div className="fuel-type-options">
                <label>
                  <input
                    type="checkbox"
                    name="all"
                    checked={fuelTypes.benzyna && fuelTypes.diesel && fuelTypes.gaz}
                    onChange={handleFuelChange}
                  />
                  Wszystkie rodzaje paliwa
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="benzyna"
                    checked={fuelTypes.benzyna}
                    onChange={handleFuelChange}
                  />
                  Benzyna
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="diesel"
                    checked={fuelTypes.diesel}
                    onChange={handleFuelChange}
                  />
                  Diesel
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="gaz"
                    checked={fuelTypes.gaz}
                    onChange={handleFuelChange}
                  />
                  Gaz
                </label>
              </div>
            )}
          </div>

          {/* Marka pojazdu */}
          <div className="select-wrapper">
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={selectedBrand ? { value: selectedBrand, label: selectedBrand } : null}
              onChange={handleBrandChange}
              options={[
                { value: "Audi", label: "Audi" },
                { value: "BMW", label: "BMW" },
              ]}
              placeholder="Marka pojazdu"
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                control: (base, state) => ({
                  ...base,
                  width: '200px',
                  borderRadius: '5px',
                  boxShadow: 'none',
                  height: '42px',
                  borderColor: state.isFocused ? 'black' : '#ccc',
                  '&:hover': {
                    borderColor: state.isFocused ? 'black' : '#ccc',
                  },
                  borderWidth: '2px',
                  textAlign: 'left',
                }),
                clearIndicator: (base) => ({
                  ...base,
                  color: 'darkgray',
                  ':hover': {
                    color: 'black',
                  },
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: 'darkgray',
                  ':hover': {
                    color: 'black',
                  },
                }),
              }}
            />
          </div>

          {/* Model pojazdu */}
          <div className="select-wrapper">
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={selectedModel ? { value: selectedModel, label: selectedModel } : null}
              onChange={handleModelChange}
              options={models}
              placeholder="Model pojazdu"
              isClearable
              isSearchable
              isDisabled={!selectedBrand}  // Disabled, jeśli marka nie jest wybrana
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                control: (base, state) => ({
                  ...base,
                  width: '200px',
                  borderRadius: '5px',
                  boxShadow: 'none',
                  height: '42px',
                  borderColor: state.isFocused ? 'black' : '#ccc',
                  '&:hover': {
                    borderColor: state.isFocused ? 'black' : '#ccc',
                  },
                  borderWidth: '2px',
                  textAlign: 'left',
                }),
                clearIndicator: (base) => ({
                  ...base,
                  color: 'darkgray',
                  ':hover': {
                    color: 'black',
                  },
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: 'darkgray',
                  ':hover': {
                    color: 'black',
                  },
                }),
              }}
            />
          </div>

          {/* Typ nadwozia */}
          <div className="select-wrapper">
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={selectedBodyType ? { value: selectedBodyType, label: selectedBodyType } : null}
              onChange={handleBodyTypeChange}
              options={[
                { value: "Sedan", label: "Sedan" },
                { value: "Hatchback", label: "Hatchback" },
                { value: "SUV", label: "SUV" },
                { value: "Coupe", label: "Coupe" },
              ]}
              placeholder="Typ nadwozia"
              isClearable
              isSearchable
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                control: (base, state) => ({
                  ...base,
                  width: '200px',
                  borderRadius: '5px',
                  boxShadow: 'none',
                  height: '42px',
                  borderColor: state.isFocused ? 'black' : '#ccc',
                  '&:hover': {
                    borderColor: state.isFocused ? 'black' : '#ccc',
                  },
                  borderWidth: '2px',
                  textAlign: 'left',
                }),
                clearIndicator: (base) => ({
                  ...base,
                  color: 'darkgray',
                  ':hover': {
                    color: 'black',
                  },
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: 'darkgray',
                  ':hover': {
                    color: 'black',
                  },
                }),
              }}
            />
          </div>

          <button className="search-button">Wyszukaj</button>
        </div>

        {/* Filter Buttons */}
        <div className="search-results-header">
          <span className="sorted-by">Sortuj:</span>
          <button
            className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => handleFilterClick("all")}
          >
            Wszystkie <span className="badge">500</span>
          </button>
          <button
            className={`filter-button ${activeFilter === "ready" ? "active" : ""}`}
            onClick={() => handleFilterClick("ready")}
          >
            Gotowe <span className="badge">423</span>
          </button>
          <button
            className={`filter-button ${activeFilter === "not-ready" ? "active" : ""}`}
            onClick={() => handleFilterClick("not-ready")}
          >
            Niegotowe <span className="badge">77</span>
          </button>
        </div>

        {/* Wyniki wyszukiwania */}
        <div className="search-results">
          {Array(8).fill(0).map((_, index) => (
            <div className="vehicle-card" key={index}>
              <div className="vehicle-icon">🚗</div>
              <h3 className="vehicle-title">2021 BMW 335i</h3>
              <p className="vehicle-vin">VIN: 07B03JNDGOE89956</p>
              <button className="details-button">Zobacz szczegóły</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
