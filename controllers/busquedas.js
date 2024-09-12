const { response } = require("express");

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');



const getTodo = async( req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );  

    const [ usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);


    res.json({

        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getColeccion = async (req, res = response) => {

    const getTabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let map = {
        'usuarios':   await Usuario.find({ nombre: regex }),
        'medicos':    await Medico.find({ nombre: regex })
                               .populate('usuario', 'nombre imagen')
                               .populate('hospital', 'nombre img'),
        'hospitales': await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre imagen'),
    }
    
    const coleccion = map[getTabla];
 
    try {
        if (coleccion.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningun registro relacionado a esa busqueda"
            });
 
        }
 
        res.json({
            "ok": true,
            coleccion
 
 
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
 
    }
 
}



module.exports = {
    getTodo,
    getColeccion
}