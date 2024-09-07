//Archivo con funciones asincronas que establecen rutas
//Las rutas (o handler) definen cómo debe responder el servidor a las solicitudes
//que coinciden con esa ruta y método HTTP


//Importo objeto pool con que me conecto con la base
const { pool } = require('../db/config');

// Función dar like a un post
const darLike = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    const values = [id];
    try {
        const result = await pool.query(consulta, values);
        console.log("Like agregado al post");
        return result;
    } catch (error) {
        console.error("Error al dar like al post:", error);
        throw error;
    }
  };


  
// const agregarPosts = async (titulo, img, descripcion, likes = 0) => {
//     const imgDefault = '/img-default.jpg'; 
//     const imagen = img || imgDefault; // Si img está vacío, se usará imgDefault
//     const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
//     const values = [titulo, imagen, descripcion, likes];
//     try {
//       const result = await pool.query(consulta, values);
//       console.log("Post agregado");
//       return result; // Devolver el resultado para el uso en `app.js` si es necesario
//     } catch (error) {
//       console.error("Error al agregar el post:", error);
//       throw error; 
//     }
//   };
  const agregarPosts = async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    const imgDefault = '/img-default.jpg';
    const titDefault = 'No hay título';  
    const desDefault = 'No hay descripción'; 
    const imagen = img || imgDefault ; 
    const tituloFinal = titulo || titDefault;
    const descripcionFinal = descripcion || desDefault;
  
    try {
      const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
      const values = [tituloFinal, imagen, descripcionFinal, 0];
      await pool.query(consulta, values);
      res.status(201).send("Post agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar el post:", error);
      res.status(500).send("Error al agregar el post");
    }
  };

const obtenerPosts = async (req, res) => {
  /*
  req: Contiene toda la información sobre la solicitud,  como los parámetros de la URL, el cuerpo de la solicitud (para métodos POST y PUT), las cabeceras HTTP...
  res: Contine la respuesta. Se utiliza para enviar la respuesta del servidor al cliente. 
  Ej: res.json(): Envía una respuesta en formato JSON. Es útil para APIs que devuelven datos en formato JSON.
  */
  try {
    // Consulta SQL para obtener todos los posts de la base de datos
    const SQLrequest = "SELECT * FROM posts ORDER BY id DESC"; 
    // Ejecuta la consulta en la base de datos usando el pool de conexiones
    const { rows: posts } = await pool.query(SQLrequest);
    // Envía los resultados de la consulta al cliente en formato JSON
    res.json(posts)
    console.log(posts)
  } catch (error) {
    // Captura y maneja cualquier error que ocurra durante la ejecución
    console.error("Error al obtener los posts:", error);
    // Lanza el error para que pueda ser manejado por un middleware de manejo de errores
    throw error;
  }
};

// Función para eliminar un post específico
  const borrarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    try {
      const result = await pool.query(consulta, values);
      console.log("Post eliminado exitosamente");
      return result;
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw error;
    }
  };


  
  module.exports = {
    obtenerPosts, darLike, agregarPosts,borrarPost
}