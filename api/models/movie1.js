const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    name: {type:String, required:true},
   // price:{type:Number, required:true},
    movieImage :{type:String, required:true}
});
module.exports=mongoose.model('Movie',movieSchema);