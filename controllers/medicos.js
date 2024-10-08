const { response } = require("express");

const Medico = require('../models/medico');


const getMedicos = async(req, res = response ) => {

    const medicos = await Medico.find()
                                     .populate('usuario','nombre img')
                                     .populate('hospital','nombre')


    res.json({
        ok: true,
        medicos
    })
}

const getMedicoById = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id)
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre');


        res.json({
        ok: true,
        medico
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg:'Hable con el admin'
        })
        
    }

   
}

const crearMedico = async(req, res = response ) => {

    const uid = req.uid    
    const medico = new Medico({
        usuario: uid,         
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
        
    }
   
}

const actualizarMedico = async(req, res = response ) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById( id );

        if ( !medico ) {
            return   res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'                
            });
        }
     

        const cambioMedico = {
            ...req.body,
            usuario: uid  
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambioMedico, { new: true } );

        res.json({
            ok: true,           
            medico: medicoActualizado
        });
      
        
    } catch (error) {

        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
        
    }
   
    
}

const borrarMedico = async(req, res = response ) => {

    const id  = req.params.id;

    try {

        const medico = await Medico.findById( id );

        if ( !medico ) {
            return   res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'                
            });
        }   
        
        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,   
            msg: 'Medico eliminado'        
        });
      
        
    } catch (error) {

        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
        
    }
}





module.exports = {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    borrarMedico
}