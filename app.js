const express = require('express');
const connectDB = require('./config/database');
const partidoRoutes = require('./routes/partidoRoutes');

const app = express();

app.use(express.json());

connectDB().catch((error) => {
  console.error('Error al conectar a MongoDB:', error.message);
});

app.use('/partidos', partidoRoutes);

const PORT = process.env.PORT || 3000;

module.exports = { app };

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
