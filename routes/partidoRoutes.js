const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

// Capa de Rutas: define los endpoints y delega en el controlador.

// Rutas especializadas (se declaran antes para mayor claridad).
router.get('/torneo/:torneo', partidoController.porTorneo);
router.get('/equipo/:equipo', partidoController.porEquipo);
// El rango llega como un único segmento "YYYY-MM-DD-YYYY-MM-DD".
router.get('/fecha/:rango', partidoController.porRangoDeFechas);

// CRUD básico.
router.get('/', partidoController.listar);
router.get('/:id', partidoController.obtenerPorId);
router.post('/', partidoController.crear);
router.put('/:id', partidoController.actualizar);
router.delete('/:id', partidoController.eliminar);

module.exports = router;
