const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Funkcja do odczytu plików JSON
const readJSONFile = (filePath) => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Endpointy do obsługi danych
app.get('/api/pojazdy', (req, res) => {
    const pojazdy = readJSONFile(path.join(__dirname, 'data', 'pojazdy.json'));
    res.json(pojazdy);
});

app.get('/api/ubezpieczenia', (req, res) => {
    const ubezpieczenia = readJSONFile(path.join(__dirname, 'data', 'ubezpieczenia.json'));
    res.json(ubezpieczenia);
});

app.get('/api/users', (req, res) => {
    const users = readJSONFile(path.join(__dirname, 'data', 'users.json'));
    res.json(users);
});

app.get('/api/warsztaty', (req, res) => {
    const warsztaty = readJSONFile(path.join(__dirname, 'data', 'warsztaty.json'));
    res.json(warsztaty);
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na http://localhost:${PORT}`);
});
