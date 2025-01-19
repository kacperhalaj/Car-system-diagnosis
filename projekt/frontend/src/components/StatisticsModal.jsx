import React from 'react';
import './StatisticsModal.css';

const StatisticsModal = ({ onClose, stats }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Statystyki pojazdów</h2>
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

                <div className="modal-form">
                    <label>
                        Najstarszy pojazd:
                        <input type="text" value={stats.oldestVehicleYear} readOnly />
                    </label>
                    <label>
                        Największy przebieg:
                        <input type="text" value={stats.maxMileage + " km"} readOnly />
                    </label>

                    <label>
                        Najnowszy pojazd:
                        <input type="text" value={stats.newestVehicleYear} readOnly />
                    </label>

                    <label>
                        Średni przebieg:
                        <input type="text" value={stats.averageMileage + " km"} readOnly />
                    </label>

                    <label>
                        Liczba samochodów:
                        <input type="text" value={stats.totalCars} readOnly />
                    </label>

                    <label>
                        Najmniejszy przebieg:
                        <input type="text" value={stats.minMileage + " km"} readOnly />
                    </label>

                    <label>
                        Liczba motocykli:
                        <input type="text" value={stats.totalMotorcycles} readOnly />
                    </label>
                </div>

                <button className="cancel-button" onClick={onClose}>Zamknij</button>
            </div>
        </div>
    );
};

export default StatisticsModal;