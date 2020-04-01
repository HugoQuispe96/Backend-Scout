var express = require('express');
var router = express.Router();
var Unidad = require('../../models/unidad.model');
var Verificar=require('../../middleware/autenticacion');

router.get('/',(req,res,next)=>{
    console.log("funciona");
});

router.get('/listar', Verificar.VerificarToken, async(req, res) => {
    try {
      const listaDb = await Unidad.find();
      res.json(listaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.post('/nuevo', Verificar.VerificarToken, async(req, res) => {
    const body = req.body;
    try {
      const unidadDB = await Unidad.create(body);
      res.status(200).json(unidadDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.get('/listar/:id', Verificar.VerificarToken, async(req, res) => {
    const _id = req.params.id;
    try {
      const unidadDB = await Unidad.findOne({_id});
      res.json(unidadDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.delete('/eliminar/:id', Verificar.VerificarToken, async(req, res) => {
    const _id = req.params.id;
    try {
        const unidadDB = await Unidad.findByIdAndDelete({_id});
        if(!unidadDB){
        return res.status(400).json({
            mensaje: 'No se encontró el id indicado',
            error
        })
        }
        res.json(unidadDB);  
    } catch (error) {
        return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
        })
    }
});

router.put('/actualizar/:id', Verificar.VerificarToken, async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const unidadDB = await Unidad.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(unidadDB);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

module.exports = router;