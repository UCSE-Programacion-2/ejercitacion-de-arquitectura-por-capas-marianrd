// Script de importación: carga data/data.json en la colección "partidos".
// Uso: npm run seed
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Partido = require('../models/partido');

async function seed() {
  try {
    await connectDB();

    const ruta = path.join(__dirname, '..', 'data', 'data.json');
    const datos = JSON.parse(fs.readFileSync(ruta, 'utf-8'));

    // Normalizamos los marcadores ausentes ("NA") a null.
    const partidos = datos.map((p) => ({
      ...p,
      home_score: p.home_score === 'NA' ? null : p.home_score,
      away_score: p.away_score === 'NA' ? null : p.away_score,
    }));

    await Partido.deleteMany({});
    const insertados = await Partido.insertMany(partidos);

    console.log(`Se importaron ${insertados.length} partidos.`);
  } catch (error) {
    console.error('Error al importar los datos:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
