/*Con este archivo configuro la base de datos la conexión a la base de datos y defino las funciones para realizar consultas*/


const { Pool } = require('pg');
/*La clase Pool nos permite soportar multiconexiones y un mejor rendimiento en las consultas*/
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

const agregarPosts = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    try {
      const result = await pool.query(consulta, values);
      console.log("Post agregado");
      return result; // Devolver el resultado para el uso en `index.js` si es necesario
    } catch (error) {
      console.error("Error al agregar el post:", error);
      throw error; // Propagar el error para manejarlo en el controlador
    }
  };


  const obtenerPosts = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM Posts");
        return rows; // Devuelve los resultados obtenidos de la base de datos
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        throw error;
    }
   }

   
    const borrarPosts = async () => {
      try {
        await pool.query("DELETE FROM posts");
        console.log("Todos los posts han sido borrados.");
      } catch (error) {
        console.error("Error al borrar los posts:", error);
        throw error;
      }
    };

// const getDate = async () => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     /*Cada consulta devuelve un objeto result con el detalle obtenido en su ejecución*/
//     console.log(result.rows[0].now);
//     /*rows: Un arreglo de objetos con todos los resultados o filas obtenido en la consulta.*/
//   } catch (error) {
//     console.error("Error al obtener la fecha:", error);
//   }
// };
// getDate()

module.exports = { agregarPosts, obtenerPosts, borrarPosts }