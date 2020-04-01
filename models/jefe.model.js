var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    id:{type:Number,required:true},
    nombre:{type:String,required:true},
    apellidos:{type:String,required:true},
    fechaNacimiento:{type:Date,required:true},
    correo:{type:String,required:true},
    unidad:{type:String,required:true},
    rol:{type:String,required:true},
    contrasena:{type:String,required:true}
});

module.exports = mongoose.model('Jefe',esquema);