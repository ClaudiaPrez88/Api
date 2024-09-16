const express = require('express');
const app = express();
const routes = require('./routes/routes');
const morgan = require('morgan'); // Middleware para registrar solicitudes

app.use(morgan('dev'));
app.use(express.json());
app.use('/', routes); 

module.exports = app;
