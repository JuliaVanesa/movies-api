const express = require ('express');
const cors = require ('cors');
const { dbConnection } = require('./config/db.config');
require('dotenv').config();


// Crear el servidor/aplicación de express
const app = express();

//Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/api/auth', require ('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo el el puerto ${process.env.PORT}`);
})