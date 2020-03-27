var express = require('express');
var router = express.Router();
var Plan = require('../../models/plan.model');
var Verificar=require('../../middleware/autenticacion');

router.get('/',(req,res,next)=>{
    console.log("funciona");
});

router.post('/Nuevo', Verificar.VerificarToken,(req,res,next)=>{
    let datos=req.body;
    let p=new Plan(datos);
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

router.get('/Listar',Verificar.VerificarToken,(req,res,next)=>{        
    Plan.find({},(err,query)=>{
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