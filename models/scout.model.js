var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    id:{type:String,required:true},
    nombre:{type:String,required:true},
    apellidos:{type:String,required:true},
    fechaNacimiento:{type:Date,required:true},
    correo:{type:String,required:true},
    unidad:{type:String,required:true},
    direccion:{type:String,required:true},
    celular:{type:String,required:true},
    nombreEmergencia:{type:String,required:true},
    celularEmergencia:{type:String,required:true},
    barrio:{type:String},
    telefono:{type:String},
    ocupacion:{type:String},
    estado:{type:Boolean, default: false},
    inscrito:{type:Boolean, default: false},
    nombreAcudiente:{type:String},
    celularAcudiente:{type:String},
});

module.exports=mongoose.model('Scout',esquema);
