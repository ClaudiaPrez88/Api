const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes'); 
const cors = require('cors')

const app = express()

// Middleware
app.use(morgan('dev'));
app.use(express.json());
// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes solo desde este origen
  methods: ['GET', 'POST'] // Permite solo ciertos métodos
}));

app.use('/', router);

module.exports = app;

