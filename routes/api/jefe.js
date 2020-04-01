var express = require('express');
var router = express.Router();
var Jefe = require('../../models/jefe.model');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var Verificar=require('../../middleware/autenticacion');


router.get('/',(req,res,next)=>{
    console.log("funciona");
});

router.post('/login',(req,res,next)=>{
    Jefe.find({id:req.body.id},(err,user)=>{
        if(err){
            return res.status(302)
            .json({error:err,estado:'fail'});
        }
        if(user.length==0)
            return res.status(302).json({error:err,estado:'fail'});
        console.log(req.body.contrasena,user[0].contrasena);
        if(bcrypt.compareSync(req.body.contrasena,user[0].contrasena)){
            //crear el token
            let token=jwt.sign({usuario:user[0],
                iat:Math.floor(Date.now() / 1000) - 30 },'shdn2io3u91289j9348h9');
            return res.status(200).json({usuario:user[0],token:token,estado:'ok'});
        }else
            return res.status(300).json({error:'No exite el usuario',estado:'fail'});
    });    
});
router.get('/listar', async(req, res) => {
    try {
      const listaDb = await Jefe.find();
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
    body.fechaNacimiento = Date.parse(body.fechaNacimiento);
    body.contrasena=bcrypt.hashSync(body.contrasena,10);
    try {
      const jefeDB = await Jefe.create(body);
      res.status(200).json(jefeDB); 
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.get('/listar/:id', async(req, res) => {
    const id = req.params.id;
    try {
      const JefeDB = await Jefe.findOne({id});
      res.json(JefeDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.delete('/eliminar/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const jefeDb = await Jefe.findByIdAndDelete({_id});
        if(!jefeDb){
        return res.status(400).json({
            mensaje: 'No se encontró el id indicado',
            error
        })
        }
        res.json(jefeDb);  
    } catch (error) {
        return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
        })
    }
});

router.put('/actualizar/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    if(body.contrasena){
        body.contrasena=bcrypt.hashSync(body.contrasena,10);
    }
    try {
      const jefeDB = await Jefe.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(jefeDB);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

module.exports = router;