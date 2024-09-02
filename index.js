require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')

// Create express server
const app = express();

// Conf Cors
app.use(cors())

// Database
dbConnection();


//Routes
app.get( '/', (req, res) => {
    
    res.json({
        ok: true,
        msg: 'Hi World',
    })
} );


app.listen( process.env.PORT, () => {
    console.log('Server is running in port: ' + process.env.PORT ) ;
} )

