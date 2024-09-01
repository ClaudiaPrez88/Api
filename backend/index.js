// Aquí se hacen las consultas y se da la instrucción para ver el resultado en el terminal

const express = require('express');
const { obtenerPosts, agregarPosts, borrarPosts } = require('./consultas');

const app = express();

// Usar middleware para procesar JSON
app.use(express.json());

// Ruta GET para obtener los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await obtenerPosts();
        console.log("Enviando los posts:", posts);
        res.json(posts); // Envía los posts en formato JSON como respuesta
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).send('Error al obtener los posts');
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3002, () => {
    console.log('Servidor iniciado en http://localhost:3002');
});


// Función principal para ejecutar las consultas en la terminal
const main = async () => {
    try {
        // Agregar un post (opcional, descomenta si deseas agregar uno)
        // await agregarPosts('Nuevo Título', 'imagen_url', 'Descripción del post', 10);

        // Borrar todos los posts
        // await borrarPosts();

        // Obtener todos los posts y mostrar en la terminal
        const posts = await obtenerPosts();
        console.log('Posts obtenidos:', posts); // Mostrar los posts en la terminal
    } catch (error) {
        console.error('Error en la consulta:', error);
    }
};

// Llamar a la función principal (opcional)
main();
