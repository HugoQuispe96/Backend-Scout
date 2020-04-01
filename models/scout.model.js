var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    fecha_nacimiento:{type:Date,required:true},
    correo:{type:String,required:true},
    unidad:{type:String,required:true},
    direccion:{type:String,required:true},
    celular:{type:String,required:true},
    nombre_emergencia:{type:String,required:true},
    celular_emergencia:{type:String,required:true},
    barrio:{type:String},
    telefono:{type:String},
    ocupacion:{type:String},
    activo:{type:String},
    inscrito_csa:{type:String},
    nombre_acudiente:{type:String},
    celular_acudiente:{type:String},
});

module.exports=mongoose.model('Scout',esquema);
