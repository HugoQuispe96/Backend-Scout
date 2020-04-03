var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var Requisito= new Schema({
    nombre:{type:String},
    descripcion:{type:String},
    estado:{type:String},
    uniforme:{type:Number}
});

var Cuadro= new Schema({
    nombre:{type:String},
    tipo:{type:String},
    fecha:{type:Date},
    requisitos:[{type:Requisito}],
});

var Plan= new Schema({
    nombre:{type:String},
    cuadros_adelanto:[{type:Cuadro}],
});

var esquema= new Schema({
    plan:[{type:Plan}],
});

module.exports=mongoose.model('Progreso',esquema);