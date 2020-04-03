var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var esquema= new Schema({
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

module.exports=mongoose.model('Scout',esquema);
