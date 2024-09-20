const express = require('express');
const router = express.Router();
const { obtenerJoyas2,obtenerJoyasConFiltros2, prepararHATEOAS,obtenerBase } = require('../controllers/inventario.controllers');
const reporteMiddleware = require('../middlewares/reporteMiddleware');

router.use(reporteMiddleware);

// router.get('/joyas', obtenerJoyas);
// // Ruta para obtener todas las joyas con HATEOAS
// router.get('/joyas/filtros', obtenerJoyasConFiltros);

router.get('/inventario', async (req, res) => {
    const queryStrings = req.query
    const inventario = await obtenerJoyas2(queryStrings)
    res.json(inventario)
    })


router.get('/joyas/filtros', async (req, res) => {
    try {
        const queryStrings = req.query;
        const inventario = await obtenerJoyasConFiltros2(queryStrings);
        res.json(inventario);
    } catch (error) {
        console.error('Error al obtener joyas con filtros:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    });
        
router.get("/joyas", async (req, res) => {
const queryStrings = req.query;
const inventario = await obtenerBase(queryStrings);
const HATEOAS = await prepararHATEOAS(inventario)
res.json(HATEOAS);
});

router.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe")
    })

module.exports = router;