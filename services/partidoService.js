const Partido = require('../models/partido');

// Capa de Lógica de Negocio: concentra el acceso al modelo y las reglas.
const partidoService = {
  // Devuelve una lista de partidos (con límite por el gran volumen de datos).
  async obtenerTodos(limite = 20) {
    return Partido.find().limit(limite);
  },

  async obtenerPorId(id) {
    return Partido.findById(id);
  },

  async crear(datos) {
    return Partido.create(datos);
  },

  // Actualización total o parcial. Devuelve el documento ya actualizado.
  async actualizar(id, datos) {
    return Partido.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
  },

  async eliminar(id) {
    return Partido.findByIdAndDelete(id);
  },

  async obtenerPorTorneo(torneo) {
    return Partido.find({ tournament: torneo });
  },

  // El equipo puede haber jugado como local o como visitante.
  async obtenerPorEquipo(equipo) {
    return Partido.find({
      $or: [{ home_team: equipo }, { away_team: equipo }],
    });
  },

  // Las fechas se guardan como String ISO (YYYY-MM-DD), por lo que la
  // comparación lexicográfica equivale a una comparación cronológica.
  async obtenerPorRangoDeFechas(fechaInicio, fechaFin) {
    return Partido.find({
      date: { $gte: fechaInicio, $lte: fechaFin },
    }).sort({ date: 1 });
  },
};

module.exports = partidoService;
