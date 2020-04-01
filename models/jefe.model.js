var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    fecha_nacimiento:{type:Date,required:true},
    correo:{type:String,required:true},
    unidad:{type:String,required:true},
    tipo:{type:String,required:true},
    contraseña:{type:String,required:true}
});

module.exports = mongoose.model('Jefe',esquema);