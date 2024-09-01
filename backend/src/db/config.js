const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();


// const db = new Pool({
// host: 'localhost',
// user: 'postgres',
// password: process.env.PASSWORD,
// database: 'likeme',
// allowExitOnIdle: true
// })


const createTables = async () =>{
    await db.query(
        `CREATE TABLE IF NOT EXISTS posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),
        descripcion VARCHAR(255), likes INT);`
    )
}

const insertData = async () =>{
    await db.query(
         `INSERT INTO posts (titulo, img, descripcion, likes) 
        VALUES ('titulo 1', 'imagen', 'la descripcion', 1)`
    )
}

const initDB = async () =>{
    console.log('creando tablas si no existen')
    await createTables()
    console.log('Insertando datos si no existen')
    await insertData()
}

const agregarPosts = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    try {
      const result = await db.query(consulta, values);
      console.log("Post agregado");
      return result; // Devolver el resultado para el uso en `index.js` si es necesario
    } catch (error) {
      console.error("Error al agregar el post:", error);
      throw error; // Propagar el error para manejarlo en el controlador
    }
  };


const obtenerPosts = async () => {
    const { rows } = await db.query("SELECT * FROM Posts")
    console.log(rows)
    return rows
    }

    

const getDate = async () => {
    try {
        const result = await db.query("SELECT NOW()")
        console.log(result.rows[0].now) // Muestra la fecha y hora actual
        return result
    } catch (error) {
        console.error('Error al obtener la fecha:', error)
    }
}

  


getDate()
module.exports = {
    db,
    initDB,
    obtenerPosts,
    agregarPosts
}