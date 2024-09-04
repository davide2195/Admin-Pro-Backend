const { response } = require("express");
const jwt = require('jsonwebtoken');



const validarJWT = (req, res = response, next) => {

    // Read token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'There is not token'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();
      
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        });
        
    }


    
}

module.exports = {
    validarJWT
}