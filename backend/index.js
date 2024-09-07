//Este archivo configura e inicia el servidor Express para tu aplicación
require('dotenv').config()
const app = require('./src/app')
const { initDB } = require('./src/db/config')

const { PORT } = process.env


app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`)
    await initDB()
})
//Levanto el servidor en el puerto que establecí