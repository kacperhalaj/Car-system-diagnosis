import React, { useState, useEffect, useRef } from "react";
import { IoChevronDown, IoCloseCircleOutline } from "react-icons/io5";
import "./Dashboard.css";

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
  const [models, setModels] = useState([]); // Modele dostępne dla marki
  const [activeFilter, setActiveFilter] = useState("all"); // Stan dla aktywnego filtra
  const fuelTypeRef = useRef(null); // Referencja do kontenera opcji rodzaju paliwa

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
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // Opcje przebiegu (25 000, 50 000, ..., 250 000 km)
  const mileageOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 25000);

  const formatMileage = (mileage) => {
    if (!mileage) return "";
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleMileageChange = (e, setter) => {
    const value = e.target.value.replace(/\s/g, ""); // Usuń spacje
    setter(value); // Ustaw wartość bez spacji
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);

    // Ustaw dostępne modele w zależności od wybranej marki
    if (brand === "Audi") {
      setModels(["A3", "A4", "A6"]);
    } else if (brand === "BMW") {
      setModels(["Series 3", "Series 5", "Series 7"]);
    } else {
      setModels([]);
    }
  };

  // Funkcja obsługująca kliknięcie przycisku filtra
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
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

          {/* Rok produkcji od/do */}
          <div className="search-input-group">
            <input
              type="text"
              list="years"
              placeholder="Rok produkcji od"
              className="search-input"
            />
            <input
              type="text"
              list="years"
              placeholder="Rok produkcji do"
              className="search-input"
            />
            <datalist id="years">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </datalist>
          </div>

          {/* Przebieg od/do */}
          <div className="search-input-group">
            <input
              type="text"
              value={formatMileage(mileageFrom)}
              onChange={(e) => handleMileageChange(e, setMileageFrom)}
              placeholder="Przebieg od (km)"
              className="search-input"
              list="mileages"
            />
            <input
              type="text"
              value={formatMileage(mileageTo)}
              onChange={(e) => handleMileageChange(e, setMileageTo)}
              placeholder="Przebieg do (km)"
              className="search-input"
              list="mileages"
            />
            <datalist id="mileages">
              {mileageOptions.map((mileage) => (
                <option key={mileage} value={mileage}>
                  {formatMileage(mileage)} km
                </option>
              ))}
            </datalist>
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
          <select className="search-select" onChange={handleBrandChange}>
            <option value="">Marka pojazdu</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
          </select>

          {/* Model pojazdu */}
          <select className="search-select" disabled={!selectedBrand}>
            <option value="">Model pojazdu</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          {/* Typ nadwozia */}
          <select className="search-select">
            <option>Typ nadwozia</option>
            <option>Hatchback</option>
            <option>Sedan</option>
          </select>

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
