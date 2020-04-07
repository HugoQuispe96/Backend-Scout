var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var Scout= new Schema({
    nombreEmergencia:{type:String,required:true},
    celularEmergencia:{type:String,required:true},
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
    contrasena:{type:String,required:true},
    unidad:{type:String,required:true},
    celular:{type:String,required:true},
    direccion:{type:String,required:true},
    rol:{type:String, default: "scout"},
    logo:{type:String, default: null},
    nombre_de_caza:{type:String, default: "scout"},
    telefono:{type:String},
    barrio:{type:String},   
    ocupacion:{type:String},
    estado:{type:Boolean, default: true},
    inscrito:{type:Boolean, default: false},
    adicional:{type:Scout, default: null}
});

module.exports = mongoose.model('Persona',esquema);