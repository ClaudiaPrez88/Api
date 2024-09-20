
const inventario = require('../models/Inventario')
const {pool} = require('../db/config'); 
const format = require('pg-format');


const obtenerBase = async () => {
  try {
    const { rows: inventario } = await pool.query('SELECT * FROM inventario'); // Obtener todas las joyas
    return inventario; // Devolver el inventario
  } catch (error) {
    console.error('Error al obtener las joyas:', error);
    throw new Error('Error al obtener joyas de la base de datos');
  }
};

  const obtenerJoyas2 = async ({ limits = 10, page = 1, order_by = "stock_ASC"}) => {
    const [campo, direccion] = order_by.split("_")
    const offset = Math.max(0, (page - 1) * limits);
    const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits,offset);
    
    try {
      const { rows: inventario } = await pool.query(formattedQuery)
      return inventario
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new Error('Error al obtener joyas de la base de datos');
    }
  };



const obtenerJoyasConFiltros2 = async ({ stock_min, precio_max, precio_min, categoria, metal }) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };

  if (precio_max) agregarFiltro('precio', '<=', precio_max);
  if (precio_min) agregarFiltro('precio', '>=', precio_min);
  if (categoria) agregarFiltro('categoria', '=', categoria);
  if (metal) agregarFiltro('metal', '=', metal);

  let consulta = "SELECT * FROM inventario";

  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }

  const { rows: inventario } = await pool.query(consulta, values);
  return inventario;
};


    const prepararHATEOAS = (inventario) => {
      const results = inventario.map((m) => {
      return {
      name: m.nombre,
      href: `/inventarios/inventario/${m.id}`,
      }
      })
      const total = inventario.length
      const HATEOAS = {
      total,
      results
      }
      return HATEOAS
      }

module.exports = { obtenerJoyas2,obtenerJoyasConFiltros2, prepararHATEOAS,obtenerBase };
