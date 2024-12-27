import React, { useState } from "react";
import "./VehicleDetailsModal.css";

const ServiceHistoryModal = ({ history, onClose, onUpdate }) => {
    const [serviceHistory, setServiceHistory] = useState(history);

    const handleAddRecord = () => {
        setServiceHistory([
            ...serviceHistory,
            { data: "", opis: "", warsztat: "" },
        ]);
    };

    const handleChange = (index, field, value) => {
        const updatedHistory = [...serviceHistory];
        updatedHistory[index][field] = value;
        setServiceHistory(updatedHistory);
    };

    const handleRemoveRecord = (index) => {
        const updatedHistory = serviceHistory.filter((_, i) => i !== index);
        setServiceHistory(updatedHistory);
    };

    const handleSaveAndClose = () => {
        onUpdate(serviceHistory); // Zapisanie aktualnych danych
        onClose(); // Zamknięcie okna
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Historia Serwisowa</h2>
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
                {serviceHistory.length === 0 ? (
                    <p className="no-data">Brak danych</p>
                ) : (
                    serviceHistory.map((record, index) => (
                        <div key={index} className="modal-form">
                            <label>
                                Data:
                                <input
                                    type="date"
                                    value={record.data}
                                    onChange={(e) =>
                                        handleChange(index, "data", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Opis:
                                <input
                                    type="text"
                                    value={record.opis}
                                    onChange={(e) =>
                                        handleChange(index, "opis", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Warsztat:
                                <input
                                    type="text"
                                    value={record.warsztat}
                                    onChange={(e) =>
                                        handleChange(index, "warsztat", e.target.value)
                                    }
                                />
                            </label>
                            <br />
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

export default ServiceHistoryModal;
