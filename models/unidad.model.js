var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
});

module.exports=mongoose.model('Unidad',esquema);