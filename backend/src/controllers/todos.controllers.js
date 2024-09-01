
const {obtenerPosts} = require('../db/config')

const getPosts = async () => {
  try {
    const posts = await obtenerPosts(); 
    return posts;
  } catch (error) {
    console.error("Error al obtener los posts  desde la base de datos:", error);
    throw error;
  }
};

  module.exports = {
    getPosts
  }