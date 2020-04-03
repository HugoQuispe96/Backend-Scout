var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    estado:{type:String, default:"No realizado"},
    uniforme:{type:Number, required:true}
});

module.exports=mongoose.model('Requisito',esquema);