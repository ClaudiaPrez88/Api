
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



const obtenerJoyasConFiltros = async ({ stock_min, precio_max, precio_min, categoria, metal }) => {
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

const prepararHATEOAS = (inventario, count, limit, pages, currentPage, offset) => {
  const results = inventario.map((m) => {
  return {
  name: m.nombre,
  href: `/inventarios/inventario/${m.id}`,
  categoria:m.categoria,
  precio: m.precio,
  stock: m.stock
  }
  })
  const total = inventario.length
  const HATEOAS = {
    total: count,        // Total de registros
    limit,               // Límite de registros por página
    pages,               // Número total de páginas
    currentPage,         // Página actual
    offset,              // Offset para la paginación
    results 

  }
  return HATEOAS
  }

// Función combinada: obtener joyas y preparar HATEOAS
const obtenerJoyasConHATEOAS = async ({ limits = 10, page = 1, order_by = "stock_ASC" }) => {
  const [campo, direccion] = order_by.split("_");
  const offset = Math.max(0, (page - 1) * limits);
  try {
    // Consulta para obtener joyas
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    const { rows: joyas } = await pool.query(formattedQuery);

    // Consulta para obtener el total de registros
    const totalJoyasQuery = await pool.query('SELECT COUNT(*) FROM inventario');
    const count = parseInt(totalJoyasQuery.rows[0].count, 10);

    // Calcular el total de páginas
    const pages = Math.ceil(count / limits);

    // Preparar la estructura HATEOAS y devolverla
    return prepararHATEOAS(joyas, count, limits, pages, page, offset);

  } catch (error) {
    console.error('Error al procesar joyas con HATEOAS:', error);
    throw new Error('Error al obtener joyas con HATEOAS');
  }
};

module.exports = { obtenerJoyas2,obtenerJoyasConFiltros, prepararHATEOAS,obtenerBase,obtenerJoyasConHATEOAS };
