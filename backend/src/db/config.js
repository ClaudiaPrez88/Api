//En este archivo conecto el backend con la base de datos a través PgAdmin 
//(herramienta para interactuar con la base de datos)


const { Pool } = require('pg');
/*importo clase Pool que permite multiconexiones con las consultas*/
const dotenv = require('dotenv');

dotenv.config();

// Configurar la conexión a la base de datos
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: process.env.PASSWORD,
  database: 'likeme',
  allowExitOnIdle: true,
/*Esta propiedad "allowExitOnIdle: true" le indicará a PostgreSQL que cierre la conexión luego de cada consulta*/
});

const createTables = async () => {
  await pool.query(
      `
      CREATE TABLE IF NOT EXISTS posts 
      (id SERIAL, 
      titulo VARCHAR(25), 
      img VARCHAR(1000),
      descripcion VARCHAR(255), 
      likes INT);
      `
  )
}


const initDB = async () => {
  console.log('Creando tablas si no existen')
  await createTables()
}


  module.exports = {pool,initDB};