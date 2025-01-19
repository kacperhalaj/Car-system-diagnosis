const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Pojazd = require('../models/Pojazd');

// Funkcja do odczytu pliku JSON
const readJSONFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Endpoint do pobierania pojazdów
router.get('/pojazdy', (req, res) => {
    const pojazdy = readJSONFile(path.join(__dirname, '../data', 'pojazdy.json'));
    res.json(pojazdy);
});

// Endpoint do dodawania nowego pojazdu
router.post('/pojazdy', (req, res) => {
    const pojazdy = readJSONFile(path.join(__dirname, '../data', 'pojazdy.json'));
    const { vin } = req.body;

    const existingVehicle = pojazdy.find(pojazd => pojazd.vin === vin);
    if (existingVehicle) {
        return res.status(400).json({ message: 'Pojazd z tym samym VIN-em już istnieje' });
    }

    const newVehicle = req.body;

    // Generuj nowe _id, jeśli nie jest dostarczone
    if (!newVehicle._id) {
        const maxId = Math.max(...pojazdy.map(pojazd => pojazd._id || 0), 0);
        newVehicle._id = maxId + 1;
    }

    // Dodaj nowy pojazd do istniejącej listy
    pojazdy.push(newVehicle);

    // Zapisz zaktualizowaną listę do pliku
    fs.writeFileSync(path.join(__dirname, '../data', 'pojazdy.json'), JSON.stringify(pojazdy, null, 2));

    res.status(201).json(newVehicle); // Zwróć nowo dodany pojazd
});

// Endpoint do aktualizacji pojazdu
router.put('/pojazdy/:id', (req, res) => {
    const { id } = req.params; // Pobierz ID pojazdu z parametrów
    const updatedVehicle = req.body; // Odbierz zaktualizowane dane pojazdu
    const pojazdy = readJSONFile(path.join(__dirname, '../data', 'pojazdy.json'));

    // Znajdź pojazd do aktualizacji
    const vehicleIndex = pojazdy.findIndex(p => p._id === parseInt(id));
    if (vehicleIndex === -1) {
        return res.status(404).json({ message: 'Pojazd nie znaleziony' });
    }

    // Zaktualizuj dane pojazdu
    pojazdy[vehicleIndex] = { ...pojazdy[vehicleIndex], ...updatedVehicle };

    // Zapisz zaktualizowaną listę do pliku
    fs.writeFileSync(path.join(__dirname, '../data', 'pojazdy.json'), JSON.stringify(pojazdy, null, 2));

    res.status(200).json(pojazdy[vehicleIndex]); // Zwróć zaktualizowany pojazd
});

// Endpoint do usuwania pojazdu
router.delete('/pojazdy/:id', (req, res) => {
    const pojazdy = readJSONFile(path.join(__dirname, '../data', 'pojazdy.json'));
    const updatedPojazdy = pojazdy.filter(pojazd => pojazd._id !== parseInt(req.params.id, 10));

    writeJSONFile(path.join(__dirname, '../data', 'pojazdy.json'), updatedPojazdy);
    res.status(200).json({ message: 'Pojazd usunięty pomyślnie' });
});

const importDataToMongoDB = async () => {
    try {
        const pojazdy = readJSONFile(path.join(__dirname, '../data', 'pojazdy.json'));
        console.log('Importowanie danych do MongoDB...');

        await Pojazd.deleteMany({}); // Usuń istniejące dane
        console.log('Istniejące dane zostały usunięte.');

        const pojazdyBezId = pojazdy.map(pojazd => {
            const { _id, ...rest } = pojazd;
            return rest;
        });

        await Pojazd.insertMany(pojazdyBezId); // Dodaj nowe dane bez _id
        console.log('Nowe dane zostały zaimportowane pomyślnie.');
    } catch (err) {
        console.error('Błąd podczas importowania danych:', err);
    }
};



// Endpoint do pobierania statystyk
router.get('/pojazdy/stats', async (req, res) => {
    try {
        await importDataToMongoDB(); // Importuj dane przed agregacją

        const stats = await Pojazd.aggregate([
            {
                $group: {
                    _id: null,
                    averageMileage: { $avg: '$przebieg' },
                    minMileage: { $min: '$przebieg' },
                    maxMileage: { $max: '$przebieg' },
                    oldestVehicleYear: { $min: '$rokProdukcji' },
                    newestVehicleYear: { $max: '$rokProdukcji' },
                    totalCars: { $sum: { $cond: [{ $ne: ['$typ', 'Motocykl'] }, 1, 0] } },
                    totalMotorcycles: { $sum: { $cond: [{ $eq: ['$typ', 'Motocykl'] }, 1, 0] } },
                },
            },
            {
                $project: {
                    averageMileage: { $round: ['$averageMileage', 0] },
                    minMileage: 1,
                    maxMileage: 1,
                    oldestVehicleYear: 1,
                    newestVehicleYear: 1,
                    totalCars: 1,
                    totalMotorcycles: 1,
                },
            },
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'Brak danych do wyświetlenia' });
        }

        res.json(stats[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});



module.exports = router;
