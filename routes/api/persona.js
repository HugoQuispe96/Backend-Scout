var express = require('express');
var router = express.Router();
var Persona = require('../../models/persona.model');

router.get('/',(req,res,next)=>{
  res.status(200).json("Funciona"); 
});

router.get('/listar', async(req, res) => {
    try {
      const listaDb = await Persona.find();
      res.json(listaDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.post('/nuevo', async(req, res) => {
    const body = req.body;
    try {
      const jefeDB = await Persona.create(body);
      res.status(200).json(jefeDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  module.exports = router;