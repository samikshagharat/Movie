const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer= require('multer');
const checkAuth=require('../middleware/check-auth');

 const storage= multer.diskStorage({
    destination: function( req, file, cb) {
       // console.log("<<<<<<<<<<<<<<>>",baseDir+'\\uploads\\')
        cb(null, './uploads/');
//        cb(null, baseDir+'\\uploads\\');
    },
    filename: function(req, file, cb){
        console.log(">>>>>>>>>>>>>>>>>", file)        
        cb (null, new Date().toISOString().replace(/:/g,'-') + file.originalname );
    }
});
const fileFilter =(req, file, cb)=> {
    if(file.mimetye ==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb (null, false);
    }
}; 

const upload = multer({storage:storage});

const Movie = require('../models/movie1');
const movieController=require('../controllers/movie1');


router.get('/',movieController.movie1_get_all );

router.post("/",upload.single('movieImage'),movieController.movie1_create_movie );

//router.get('/:productId', ProductController.proucts_get_product );

//router.patch('/:productId',checkAuth,ProductController.products_update_product);

//router.delete('/:productId',checkAuth, ProductController.products_delete_product);

module.exports = router;