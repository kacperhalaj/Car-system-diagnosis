const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const pojazdyRoutes = require('./routes/pojazdy');
const insurancesRoutes = require('./routes/ubezpieczenia');
const usersRoutes = require('./routes/users');
const garageRoutes = require('./routes/warsztaty');

app.use('/api', pojazdyRoutes);
app.use('/api', insurancesRoutes);
app.use('/api', usersRoutes);
app.use('/api', garageRoutes);

// Połącz z MongoDB
connectDB();


app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na http://localhost:${PORT}`);
});

