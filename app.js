const express=require('express');
const cors= require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieRoute= require('./api/routes/movie1');

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://samiksha1:samiksha1@ds141294.mlab.com:41294/new_project',{ useNewUrlParser: true })
.then(function(){
     console.log("mongodb connect success ", url)
   

}).catch(function(err){

});


mongoose.Promise = global.Promise;
app.use('/movie1',movieRoute);


app.use((req, res, next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });

});


module.exports= app;