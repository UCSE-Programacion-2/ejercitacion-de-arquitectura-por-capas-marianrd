const partidoService = require('../services/partidoService');

// Capa de Controladores: maneja req/res y delega en el servicio.
const partidoController = {
  async listar(req, res) {
    try {
      const partidos = await partidoService.obtenerTodos(20);
      res.status(200).json(partidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const partido = await partidoService.obtenerPorId(req.params.id);
      if (!partido) {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
      res.status(200).json(partido);
    } catch (error) {
      // Un ID con formato inválido provoca un CastError -> no existe.
      if (error.name === 'CastError') {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async crear(req, res) {
    try {
      const nuevoPartido = await partidoService.crear(req.body);
      res.status(201).json(nuevoPartido);
    } catch (error) {
      // Datos inválidos según el esquema.
      res.status(400).json({ error: error.message });
    }
  },

  async actualizar(req, res) {
    try {
      const partido = await partidoService.actualizar(req.params.id, req.body);
      if (!partido) {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
      res.status(200).json(partido);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  async eliminar(req, res) {
    try {
      const partido = await partidoService.eliminar(req.params.id);
      if (!partido) {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
      res.status(200).json({ mensaje: 'Partido eliminado', partido });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async porTorneo(req, res) {
    try {
      const partidos = await partidoService.obtenerPorTorneo(req.params.torneo);
      res.status(200).json(partidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async porEquipo(req, res) {
    try {
      const partidos = await partidoService.obtenerPorEquipo(req.params.equipo);
      res.status(200).json(partidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async porRangoDeFechas(req, res) {
    try {
      // El parámetro llega como "YYYY-MM-DD-YYYY-MM-DD"; lo dividimos en dos
      // fechas ISO reuniendo los primeros y los últimos tres segmentos.
      const partes = req.params.rango.split('-');
      if (partes.length !== 6) {
        return res.status(400).json({
          error: 'Formato esperado: /partidos/fecha/YYYY-MM-DD-YYYY-MM-DD',
        });
      }
      const fechaInicio = partes.slice(0, 3).join('-');
      const fechaFin = partes.slice(3).join('-');

      const partidos = await partidoService.obtenerPorRangoDeFechas(fechaInicio, fechaFin);
      res.status(200).json(partidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = partidoController;
