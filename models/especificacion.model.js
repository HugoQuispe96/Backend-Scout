var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    detalle:{type:String,required:true},
    plan_asignado:{type:String,required:true},
});

module.exports=mongoose.model('Especificacion',esquema);