
const { pool } = require('../db/config');
//importo la base
const format = require('pg-format');
//ayuda a formatear consultas SQL y manejar parámetros de manera segura
const { handleGenerateHATEOAS } = require('../helpers/helpers');

const Fetch = async (limits = 3, orderBy = 'precio ASC', page = 1, filters = {}) => {
  //Defino función con limite default de 3 resultados, ordenado asi, en la página 1 y un ojbjeto con filtros
  try {
    limits = Number(limits);
    page = Number(page);
    //convierto ambos en números por seguridad
    const offset = (page - 1) * limits;
    //calculo de offset(resultados se deben omitir para la paginación)

    const [field, order] = orderBy.split('_');
  //Procesamiento del Parámetro orderBy
    if (!field || !order) {
    //si no existan arroja error
      throw new Error('Parámetro `orderBy` inválido. Debe ser en formato "campo_orden".');
    }

  //definición de arrays 
    const whereClauses = [];
    const values = [];
  
//Filtro de precio_min
    if (filters.precio_min) {
      whereClauses.push('precio >= $' + (values.length + 1));
      values.push(filters.precio_min);
    }
//Filtro de precio_max
    if (filters.precio_max) {
      whereClauses.push('precio <= $' + (values.length + 1));
      values.push(filters.precio_max);
    }
//Filtro de categoria
    if (filters.categoria) {
      whereClauses.push('categoria = $' + (values.length + 1));
      values.push(filters.categoria);
    }
//Filtro de metal
    if (filters.metal) {
      whereClauses.push('metal = $' + (values.length + 1));
      values.push(filters.metal);
    }
    
//formación de las consultas a base de datos
    let SQLrequest = 'SELECT * FROM inventario';
    if (whereClauses.length > 0) {
      SQLrequest += ' WHERE ' + whereClauses.join(' AND ');
    }
    SQLrequest += ` ORDER BY ${field} ${order} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limits, offset);
    
    const { rows } = await pool.query(SQLrequest, values);

    const countQuery = 'SELECT COUNT(*) FROM inventario' + (whereClauses.length > 0 ? ' WHERE ' + whereClauses.join(' AND ') : '');
    const { rows: countResult } = await pool.query(countQuery, values.slice(0, -2));
    const count = parseInt(countResult[0].count, 10);

//Se construye objeto data
    const data = {
      rows, //resultados de consulta
      count,//n° total de registros q cumplen con filtros. Sirve para calcular paginacion
      type: 'inventario',//info para saber que datos tengo
      limits,//número máximo
      pages: Math.ceil(count / limits),//Math.ceil() redondea hacia arriba para y asegura todos los registros en la paginación
      currentPage: page,//pagina actual
      offset//El número de registros que se deben omitir para la paginación
    };

    return handleGenerateHATEOAS(data);
    //llama la funcion y le pasa el objeto data

  } catch (error) {
    console.error('Error al obtener el inventario:', error);
    throw error;
  }
};

module.exports = { Fetch };
