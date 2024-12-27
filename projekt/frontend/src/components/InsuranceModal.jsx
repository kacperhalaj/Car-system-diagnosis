import React, { useState } from "react";
import "./VehicleDetailsModal.css";

const InsuranceModal = ({ insurance, onClose, onUpdate }) => {
    const [insuranceData, setInsuranceData] = useState(insurance);

    const handleAddRecord = () => {
        setInsuranceData([
            ...insuranceData,
            { firmaUbezpieczeniowa: "", typUbezpieczenia: "", dataRozpoczecia: "", dataZakonczenia: "" },
        ]);
    };

    const handleChange = (index, field, value) => {
        const updatedInsurance = [...insuranceData];
        updatedInsurance[index][field] = value;
        setInsuranceData(updatedInsurance);
    };

    const handleRemoveRecord = (index) => {
        const updatedInsurance = insuranceData.filter((_, i) => i !== index);
        setInsuranceData(updatedInsurance);
    };

    const handleSaveAndClose = () => {
        onUpdate(insuranceData); // Save the current insurance data
        onClose(); // Close the modal
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Ubezpieczenie</h2>
                    <div className="close" onClick={onClose}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <svg viewBox="0 0 36 36" className="circle">
                            <path
                                stroke-dasharray="100, 100"
                                d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                    </div>
                </div>
                {insuranceData.length === 0 ? (
                    <p className="no-data">Brak danych</p>
                ) : (
                    insuranceData.map((record, index) => (
                        <div key={index} className="modal-form">
                            <label>
                                Firma Ubezpieczeniowa:
                                <input
                                    type="text"
                                    value={record.firmaUbezpieczeniowa}
                                    onChange={(e) =>
                                        handleChange(index, "firmaUbezpieczeniowa", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Typ Ubezpieczenia:
                                <input
                                    type="text"
                                    value={record.typUbezpieczenia}
                                    onChange={(e) =>
                                        handleChange(index, "typUbezpieczenia", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Data Rozpoczęcia:
                                <input
                                    type="date"
                                    value={record.dataRozpoczecia}
                                    onChange={(e) =>
                                        handleChange(index, "dataRozpoczecia", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Data Zakończenia:
                                <input
                                    type="date"
                                    value={record.dataZakonczenia}
                                    onChange={(e) =>
                                        handleChange(index, "dataZakonczenia", e.target.value)
                                    }
                                />
                            </label>

                            <button
                                className="remove-button"
                                onClick={() => handleRemoveRecord(index)}
                            >
                                Usuń
                            </button>
                        </div>
                    )))}

                <div className="modal-buttons">
                    <button onClick={handleSaveAndClose}>Zapisz</button>
                    <button className="add-button" onClick={handleAddRecord}>
                        Dodaj Rekord
                    </button>
                    <button onClick={onClose}>Zamknij</button>
                </div>
            </div>
        </div>
    );
};

export default InsuranceModal;
