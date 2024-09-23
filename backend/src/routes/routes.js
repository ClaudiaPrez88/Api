const express = require('express');
const router = express.Router();
const {obtenerJoyasConHATEOAS,obtenerJoyasConFiltros } = require('../controllers/inventario.controllers');
const reporteMiddleware = require('../middlewares/reporteMiddleware');

router.use(reporteMiddleware);


router.get('/joyas', async (req, res) => {
    const { limits, page, order_by } = req.query; 
    // Obtener parámetros de la query string
    
    try {
      // Llamar a la función combinada
      const joyasConHATEOAS = await obtenerJoyasConHATEOAS({ limits, page, order_by });
      
      // Enviar la respuesta al cliente
      res.json(joyasConHATEOAS);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener joyas', error });
    }
  });
  
router.get('/joyas/filtros', async (req, res) => {
const { precio_max, precio_min, categoria, metal } = req.query;
try {
    const joyasFiltradas = await obtenerJoyasConFiltros({ precio_max, precio_min, categoria, metal });
    res.json(joyasFiltradas);
} catch (error) {
    res.status(500).json({ message: 'Error al obtener joyas filtradas', error });
}
});

router.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe")
    })

module.exports = router;