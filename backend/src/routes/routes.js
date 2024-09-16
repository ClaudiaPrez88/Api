const express = require('express');
const router = express.Router();
const { obtenerJoyas, obtenerJoyasConFiltros } = require('../controllers/inventario.controllers');

router.get('/joyas', obtenerJoyas);
// Ruta para obtener todas las joyas con HATEOAS
router.get('/joyas/filtros', obtenerJoyasConFiltros);

module.exports = router;