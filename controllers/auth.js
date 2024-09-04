const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response) => {

    // Verificar email
    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            })
        }


        //  Verificar password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid'
            })
        }

        // Generar el Token - JWT
        const token = await generarJWT( userDB.id );

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el admin"
        })        
    }
}



module.exports = {
    login
}