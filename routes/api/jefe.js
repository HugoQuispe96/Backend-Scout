var express = require('express');
var router = express.Router();
var Jefe = require('../../models/jefe.model');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var Verificar=require('../../middleware/autenticacion');


router.get('/',(req,res,next)=>{
    console.log("funciona");
});

router.post('/Nuevo',(req,res,next)=>{
    let datos=req.body;
    let p=new Jefe(datos);
    p.contraseña=bcrypt.hashSync(p.contraseña,10);
    p.save((err,nuevo)=>{
        if(err){
            res.status(300).json({nuevo:[],error:err,estado:'fail'});
        }
        if(!nuevo){
            res.status(302).json({error:'que paso??',estado:'fail'});
        }
        return res.status(200).json({nuevo:nuevo,estado:'ok'});
    });
});

router.post('/Login',(req,res,next)=>{
    Jefe.find({nombre:req.body.nombre},(err,user)=>{
        if(err){
            return res.status(302)
            .json({error:err,estado:'fail'});
        }
        if(user.length==0)
            return res.status(302).json({error:err,estado:'fail'});
        console.log(req.body.contraseña,user[0].contraseña);
        if(bcrypt.compareSync(req.body.contraseña,user[0].contraseña)){
            //crear el token
            let token=jwt.sign({usuario:user[0],
                iat:Math.floor(Date.now() / 1000) - 30 },'shdn2io3u91289j9348h9');
            console.log(token);
            return res.status(200).json({usuario:user[0],token:token,estado:'ok'});
        }else
            return res.status(300).json({error:'No exite el usuario',estado:'fail'});
    });    
});

router.get('/Listar',Verificar.VerificarToken,(req,res,next)=>{        
    Jefe.find({},(err,query)=>{
        if(err){
            res.status(300).json({lista:[],error:err,estado:'fail'});
        }
        if(!query){
            res.status(302).json({lista:[],error:'que??',estado:'fail'});
        }
        return res.status(200).json({estado:1,lista:query,estado:'ok'});
    });   
});



module.exports = router;