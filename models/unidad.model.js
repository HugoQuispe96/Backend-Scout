var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    unidad:{type:String,required:true},
    plan_asignado:{type:Schema.Types.ObjectId,ref: 'Plan', default: null},
});

module.exports=mongoose.model('Unidad',esquema);