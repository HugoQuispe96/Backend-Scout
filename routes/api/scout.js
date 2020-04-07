var express = require('express');
var router = express.Router();
var Persona = require('../../models/persona.model');
var Scout = require('../../models/scout.model');
var Unidad = require('../../models/unidad.model');
var Plan = require('../../models/plan.model');
var Cuadro_adelanto = require('../../models/cuadro.model');
var Requisito = require('../../models/requisito.model');
var Progreso = require('../../models/progreso_plan.model');
var Verificar=require('../../middleware/autenticacion');
var bcrypt=require('bcrypt');
08-04-1996

router.get('/', async(req,res,next)=>{
  res.json(calcularEdad("03-04-1996"));
});

router.get('/plan/:id', async(req,res,next)=>{
    const _id = req.params.id;
    try {
      const scoutDB = await Persona.findOne({_id});
      const ProgresoDB = await Progreso.findOne({_id:scoutDB.adicional.progreso_plan});
      res.json(ProgresoDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
});

router.get('/listar', Verificar.VerificarToken, async(req, res) => {
  try {
      const listaDb = await Persona.find({'rol':'scout'});
      res.json(listaDb);
  } catch (error) {
      return res.status(400).json({
      mensaje: 'Ocurrio un error',
        error
      })
    }
  });

router.post('/nuevo', Verificar.VerificarToken, async(req, res) => {
    var persona = Object.create(Persona);
    var adicional = Object.create(Scout);
    var progreso = new Progreso();
    var id_progreso = "";

    persona.id= req.body.id;
    persona.nombre= req.body.nombre;
    persona.apellidos= req.body.apellidos;
    persona.correo= req.body.correo;
    if(req.body.unidad){
      persona.unidad=req.body.unidad;
      try {
        const UnidadDB = await Unidad.findOne({nombre:req.body.unidad});
        const PlanDB = await Plan.findOne({_id:UnidadDB.plan_asignado});
        var Cuadros = [];
        var Requisitos = [];
        for (const cuadro of PlanDB.cuadros_adelanto) {
          var CuadroDB = await Cuadro_adelanto.findOne({_id:cuadro});
          for (const requisito of CuadroDB.requisitos) {
            var RequisitoDB = await Requisito.findOne({_id:requisito});
            Requisitos.push(RequisitoDB);
          }
          CuadroDB.requisitos = Requisitos;
          Requisitos = [];
          Cuadros.push(CuadroDB);
        }
        PlanDB.cuadros_adelanto=Cuadros;
        progreso.plan.push(PlanDB);
        const ProgresoDB = await Progreso.create(progreso);
        id_progreso=ProgresoDB._id;
      } catch (error) {
        return res.status(400).json({
        mensaje: 'Error al crear el progreso',
          error
        })
      }
    }
    if(req.body.contrasena){
      persona.contrasena=bcrypt.hashSync(req.body.contrasena,10);
    }
    if(req.body.contrasena){
      persona.fechaNacimiento = Date.parse(req.body.fechaNacimiento);
    }

    persona.direccion = req.body.direccion;
    persona.celular = req.body.celular;
    adicional.nombreEmergencia = req.body.nombreEmergencia;
    adicional.celularEmergencia = req.body.celularEmergencia;
    persona.barrio = req.body.barrio;
    persona.telefono = req.body.telefono;
    persona.ocupacion = req.body.ocupacion;
    persona.estado = req.body.estado;
    persona.inscrito = req.body.inscrito;
    adicional.nombreAcudiente = req.body.nombreAcudiente;
    adicional.celularAcudiente = req.body.celularAcudiente;
    adicional.progreso_plan = id_progreso;
    persona.adicional = adicional;

    try {
      const scoutDB = await Persona.create(persona);
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
      const scoutDB = await Persona.findOne({id, 'rol':'scout' });
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
        const scoutDB = await Persona.findByIdAndDelete({_id});
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
    var persona = Object.create(Persona);
    var adicional = Object.create(Scout);
    if(req.body.id){
      persona.id= req.body.id;
    }
    if(req.body.nombre){
      persona.nombre= req.body.nombre;
    }
    if(req.body.apellidos){
      persona.apellidos= req.body.apellidos;
    }
    if(req.body.correo){
      persona.correo= req.body.correo;
    }
    if(req.body.unidad){
      persona.unidad= req.body.unidad;
    }
    if(req.body.contrasena){
      persona.contrasena=bcrypt.hashSync(req.body.contrasena,10);
    }
    if(req.body.fechaNacimiento){
      persona.fechaNacimiento = Date.parse(req.body.fechaNacimiento);
    }

    if(req.body.celularAcudiente||req.body.nombreAcudiente||req.body.inscrito||req.body.estado||req.body.ocupacion||req.body.telefono||req.body.barrio||
    req.body.celularEmergencia||req.body.nombreEmergencia||req.body.celular||req.body.direccion){
      if(req.body.direccion){
        persona.direccion = req.body.direccion;
      }
      if(req.body.celular){
        persona.celular = req.body.celular;
      }
      if(req.body.nombreEmergencia){
        adicional.nombreEmergencia = req.body.nombreEmergencia;
      }
      if(req.body.celularEmergencia){
        adicional.celularEmergencia = req.body.celularEmergencia;
      }
      if(req.body.barrio){
        persona.barrio = req.body.barrio;
      }
      if(req.body.telefono){
        persona.telefono = req.body.telefono;
      }
      if(req.body.ocupacion){
        persona.ocupacion = req.body.ocupacion;
      }
      if(req.body.estado){
        persona.estado = req.body.estado;
      }
      if(req.body.inscrito){
        persona.inscrito = req.body.inscrito;
      }
      if(req.body.nombreAcudiente){
        adicional.nombreAcudiente = req.body.nombreAcudiente;
      }
      if(req.body.celularAcudiente){
        adicional.celularAcudiente = req.body.celularAcudiente;
      }
      persona.adicional = adicional;
    }

    try {
      const scoutDB = await Persona.findByIdAndUpdate(
        _id,
        persona,
        {new: true});
      res.json(scoutDB);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}
module.exports = router;