var express = require('express');
var router = express.Router();
var Scout = require('../../models/scout.model');
var Verificar=require('../../middleware/autenticacion');

router.get('/',(req,res,next)=>{
    console.log("funciona");
});

router.get('/listar', Verificar.VerificarToken, async(req, res) => {
    try {
      const listaDb = await Scout.find();
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
      const scoutDB = await Scout.create(body);
      res.status(200).json(scoutDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.get('/listar/:id', Verificar.VerificarToken, async(req, res) => {
    const id = req.params.id;
    try {
      const scoutDB = await Scout.findOne({id});
      res.json(scoutDB);
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
        const scoutDB = await Scout.findByIdAndDelete({_id});
        if(!scoutDB){
        return res.status(400).json({
            mensaje: 'No se encontró el id indicado',
            error
        })
        }
        res.json(scoutDB);  
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
      const scoutDB = await Scout.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(scoutDB);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

module.exports = router;