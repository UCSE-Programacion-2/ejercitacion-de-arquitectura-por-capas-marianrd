const mongoose = require('mongoose');

// Capa de Acceso a Datos: esquema de Mongoose para un partido.
const partidoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  home_team: { type: String, required: true },
  away_team: { type: String, required: true },
  // Algunos registros históricos no tienen marcador ("NA" -> null).
  home_score: { type: Number, default: null },
  away_score: { type: Number, default: null },
  tournament: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  neutral: { type: Boolean, default: false },
});

// Tercer argumento: nombre fijo de la colección -> "partidos".
module.exports = mongoose.model('Partido', partidoSchema, 'partidos');
