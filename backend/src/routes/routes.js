const express = require('express');
const router = express.Router();
const { obtenerJoyas2,obtenerJoyasConFiltros2, prepararHATEOAS,obtenerBase,obtenerJoyasConHATEOAS } = require('../controllers/inventario.controllers');
const reporteMiddleware = require('../middlewares/reporteMiddleware');

router.use(reporteMiddleware);


router.get('/inventario', async (req, res) => {
    const queryStrings = req.query
    const inventario = await obtenerJoyas2(queryStrings)
    res.json(inventario)
    })


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
  

router.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe")
    })

module.exports = router;