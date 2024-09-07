
//Este archivo configura y expone una instancia de una aplicación Express

const express = require('express')
const morgan = require('morgan')
//Registra información sobre las solicitudes HTTP para que yo pueda verlas en la consola
const router = require('./routes/routes')
//importo las rutas creadas
const cors = require('cors')
//configurar qué dominios pueden hacer solicitudes

//Inicialización de la Aplicación
const app = express()

//Configuración de Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173']
}))
//Habilito este dominio para interactuar con el servidor

//Definición de Rutas:Utiliza las rutas definidas en el archivo routes/routes.js 
//para manejar las solicitudes que llegan a la raíz
app.use('/', router)

// Middleware de manejo de errores (debe ir al final)
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el error en la consola del server
    res.status(500).send('Algo salió mal!'); // Envía una respuesta de error al cliente
  });

//Exporto la App
module.exports =app;