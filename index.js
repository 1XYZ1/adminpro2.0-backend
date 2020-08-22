// Variables de entorno
require('dotenv').config();
// Crear servidor express
const express = require('express');
// Inicializar express
const app = express();
// Config DB
const { dbConnection } = require('./db/config');
// Import CORS
const cors = require('cors');
// Config CORS
app.use(cors());

// Base de datos

dbConnection();

// User : mean_user
// Password: 5rpBp9WHs42l7bGB
// Rutas

app.get('/', (req, res) => {
    res.json({ ok: true, message: 'Hola mundo' })
})

app.listen(process.env.PORT, () => {
    console.log('Server on port: ' + process.env.PORT);
})