const mongoose = require('mongoose');

const PojazdSchema = new mongoose.Schema({
    rokProdukcji: { type: Number, required: true },
    przebieg: { type: Number, required: true },
    typ: { type: String, required: true },
}, { collection: 'pojazdy' });

module.exports = mongoose.model('Pojazd', PojazdSchema);