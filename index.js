require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')

// Create express server
const app = express();

// Conf Cors
app.use(cors())

// Lectura y parseo del body
app.use( express.json() );


// Database
dbConnection();


//Routes
app.use( '/api/usuarios', require('./routes/users') );
app.use( '/api/login', require('./routes/auth') );



app.listen( process.env.PORT, () => {
    console.log('Server is running in port: ' + process.env.PORT ) ;
} )

