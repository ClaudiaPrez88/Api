/*Aquí configuro rutas para la app Express y asocio las funciones de controlador a esas rutas*/
//importar función 
const { obtenerPosts, darLike, agregarPosts,borrarPost } = require('../controllers/posts.controllers')

const router = require('express').Router()
//Los routers son un objeto de express utilizados para manejar un grupo de rutas en una aplicación

router.get('/', function (req, res) {
//Define una ruta GET para la raíz (/)
    res.sendFile(__dirname + '/index.html')
//Cuando cliente solicita esta ruta, el servidor envía el archivo index.html
})


// me trae los resultados que vienen en formato json y me los muestra en la ruta /posts
router.get('/posts', obtenerPosts);
router.post('/posts', agregarPosts);

router.patch('/posts/like/:id', async (req, res) => {
    const { id } = req.params; // Extrae el id de la solicitud
    try {
        await darLike(id); // Llama a la función darLike con el id
        res.status(200).send("Like agregado al post"); // Envía una respuesta exitosa
    } catch (error) {
        console.error("Error al dar like al post:", error);
        res.status(500).send("Error al dar like al post"); // Envía una respuesta de error
    }
});
  // Ruta para eliminar un post específico
  router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params; // Extrae el id de la solicitud
    try {
        await borrarPost(id); // Llama a la función borrarPost con el id
        res.status(200).send("Post eliminado exitosamente"); // Envía una respuesta exitosa
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).send("Error al eliminar el post"); // Envía una respuesta de error
    }
  });

module.exports = router