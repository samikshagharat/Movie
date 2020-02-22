const Movie = require('../models/movie1');
const mongoose = require('mongoose');

exports.movie1_get_all=(req, res, next) => {
    Movie.find()
    .select('name price _id produtImage')
    .exec()
    .then( docs => {
      const response ={
          count: docs.length,
          products: docs.map(doc =>{
              return{
                  name:doc.name,
                  //price:doc.price,
                  _id:doc._id,
                  movieImage:doc.movieImage,
                  request:{
                      type:'GET',
                      url:'http://localhost:3000/products/' +doc._id
                  }
              }
          })
      };
      res.status(200).json(response);
 });
}
exports.movie1_create_movie=(req, res, next) => {
    console.log(req.file,"opppp");
    const movie = new Movie({
      //_id= new mongoose.Types.ObjectId(),
        name: req.body.name,
       // price: req.body.price,
        movieImage: req.file.path
    });
    movie
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created movie sucessfully',
                createdMovie: {
                    name:result.name,
                    //price: result.price,
                _id:result._id,
                request:{
                        type:'GET',
                        url:'http://localhost:3000/movie/' +result._id
                }
            }
        });
    })
        .catch(err => {
            console.log(err,"fffff");
            res.status(500).json({
                error: err
            })
        });
}
exports.movie_get_movie=(req, res, next) => {
    const id = req.params.movietId;
   // ProductId=req.params.productId;
    Movie.findById(id)
    .select('name  _id movieImage')
    .exec()
    .then(doc => {
        console.log('from database',doc);
           if (doc){
            res.status(200).json({
                movie:doc,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/movie/' 
                }

                
            })   
           } 
        
    })
    .catch(err => {
        console.log(err);
        // res.status(500).json({error:err});
        res.status(404).json({message:'no valid entry found for provided ID'});
    });
    
}
exports.movie_update_movie= (req, res, next) => {

    // var updateOps=req.body;
    // var id= req.params.ProductId;
    // Product.update({_id:id}, { $set: updateOps})
    const id = req.params.movieId;
    const updateOps=req.body;
    console.log('updateops', updateOps)
    // for( const ops of req.body) {
    //     updateOps[ops.propName] = ops.value; 
    // }
    console.log(id, updateOps)
    Movie.update({_id: id}, { $set: updateOps}, {new: true})
    .exec()
    .then( result=> {
        res.status(200).json({
            message:'Movie updated',
            request:{
                type:'GET',
                url:'http://localhost/movie/'+ id
            }

        });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}
exports.movie_delete_movie=(req, res, next) => {
    const id = req.params.movieId;
   Movie.remove({ _id :id})
   .exec()
   .then( result => {
       res.status(200).json({
        message:'movie deleted',
        request:{
            type:'POST',
            url:'http://localhost:3000/movie',
            body:{name:'String',price:'Number'}
        }
       })
   })
   .catch( err => {
      console.log(err);
      res.status(500).json({
          error:err
      });
   });
}