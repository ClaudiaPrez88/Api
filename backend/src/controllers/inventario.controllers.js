
const inventario = require('../models/Inventario');

const obtenerJoyas = async (req, res) => {
  try {
    const { limits = 3, page = 1, order_by = 'precio_ASC' } = req.query;
    //destructuración para extraer los valores de limit, page, y order_by de la query string 
    const response = await inventario.Fetch(limits, order_by, page);
    // Llamada al modelo para obtener los datos
    res.json(response);
    //envía la respuesta al cliente en formato JSON
  } catch (error) {
    console.error('Error en la ruta GET /joyas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerJoyasConFiltros = async (req, res) => {
  try {
    const response = await inventario.Fetch(3, 'precio_ASC', 1, req.query);
    res.json(response);
  } catch (error) {
    console.error('Error en la ruta GET /joyas/filtros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { obtenerJoyas, obtenerJoyasConFiltros };
