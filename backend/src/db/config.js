
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: process.env.PASSWORD,
  database: 'joyas',
  allowExitOnIdle: true,
/*Esta propiedad "allowExitOnIdle: true" le indicará a PostgreSQL que cierre la conexión luego de cada consulta*/
});

const createTables = async () => {
  await pool.query(
      `
      CREATE TABLE IF NOT EXISTS inventario 
     (id SERIAL, nombre VARCHAR(50), 
     categoria VARCHAR(50), 
     metal VARCHAR(50), 
     precio INT, stock INT);
      `
  )
}


const insertarData = async () => {
    // Verificar si la tabla está vacía
    const result = await pool.query('SELECT COUNT(*) FROM inventario');
    const count = parseInt(result.rows[0].count, 10);
  
    if (count === 0) {
      await pool.query(
        `
        INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES
        ('Collar Heart', 'collar', 'oro', 20000, 2),
        ('Collar History', 'collar', 'plata', 15000, 5),
        ('Aros Berry', 'aros', 'oro', 12000, 10),
        ('Aros Hook Blue', 'aros', 'oro', 25000, 4),
        ('Anillo Wish', 'aros', 'plata', 30000, 4),
        ('Anillo Cuarzo Greece', 'anillo', 'oro', 40000, 2);
        `
      );
    }
  };

const initDB = async () => {
  console.log('Creando tablas si no existen')
  await createTables()
  await insertarData()
}


  module.exports = {pool,initDB};