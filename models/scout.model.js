var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var esquema= new Schema({
    nombreEmergencia:{type:String,required:true},
    celularEmergencia:{type:String,required:true},
    nombreAcudiente:{type:String},
    celularAcudiente:{type:String},
    progreso_plan:{type:Schema.Types.ObjectId,ref: 'Progreso'},
});

module.exports=mongoose.model('Scout',esquema);
