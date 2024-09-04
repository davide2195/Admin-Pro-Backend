const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');


const getUsers = async(req, res) => {

    const users = await User.find({}, 'name email google role');
    
    res.json({
        ok: true,
        users,
        uid: req.uid
    });
    
}

const createUsers = async(req, res = response) => {

    const { name, password, email } = req.body;
 

    try {

        const existsEmail = await User.findOne({ email });

        if ( existsEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya está creado'
            })
        }

        const user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        // Save user
        await user.save();    

        // Generar el TOKEN - JWT
        const token = await generarJWT( user.id );
        
        res.json({
            ok: true,
            user,
            token
        });        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpect error... checks logs'
        });
    }
   
}

const updateUser = async ( req, res = response ) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Id does not exist'
            });
        }

         // Actualizaciones
         const { password, google, email, ...campos } = req.body;

        if ( userDB.email !== email ) {

            const emailExist = await User.findOne({ email });
            if( existsEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese correo"
                });
            }
        } 
        
        campos.email = email;
        const uploadedUser = await User.findByIdAndUpdate( uid, campos, {new: true} );

        res.json({
            ok: true,
            user: updateUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "unexpected error"
        })
        
    }

}

const deleteUser = async( req, res = response ) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Id does not exist'
            });
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: "User deleted"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el admin"

        })
        
    }

}
 

module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
}