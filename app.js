const express = require('express');
const app = express();
const sequelize = require('./database/db');

require('dotenv').config();

/* 
require('./database/relacionesM-M'); */

// Setting
const PORT = process.env.PORT || 3000;

// Manejar el CORS policity
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET,DELETE,PUT");
    next();
  }); 

// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/api'));

// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arrancado en http://localhost:${PORT}`);
    
    // Conectase a la base de datos
    // Force true: DROP TABLES
    sequelize.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
    
});