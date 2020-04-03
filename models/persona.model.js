var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var Scout= new Schema({
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
    progreso_plan:{type:Schema.Types.ObjectId,ref: 'Progreso'},
});

var esquema= new Schema({
    id:{type:Number,required:true},
    nombre:{type:String,required:true},
    apellidos:{type:String,required:true},
    fechaNacimiento:{type:Date,required:true},
    correo:{type:String,required:true},
    unidad:{type:Schema.Types.ObjectId,ref: 'Unidad'},
    rol:{type:String, default: "scout"},
    contrasena:{type:String,required:true},
    adicional:{type:Scout, default: null}
});

module.exports = mongoose.model('Persona',esquema);