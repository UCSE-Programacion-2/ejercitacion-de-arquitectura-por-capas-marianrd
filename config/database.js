const mongoose = require('mongoose');

// Capa de Configuración: establece la conexión con MongoDB.
async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('La variable de entorno MONGO_URI no está definida.');
  }

  // Si ya existe una conexión activa (p. ej. en los tests), la reutilizamos.
  if (mongoose.connection.readyState !== 0) {
    return mongoose.connection;
  }

  await mongoose.connect(uri);
  console.log('Conectado a MongoDB');
  return mongoose.connection;
}

module.exports = connectDB;
