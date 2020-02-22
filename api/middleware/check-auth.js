/* const jwt=require('jsonwebtoken');
const{ JWT_KEY,envm,JWT_KEY_PROD } = require('../../config')

module.exports=(req, res, next) =>{
    try{
          const token=req.headers.authorization.split(" ")[1];
          jwt.verify(token,JWT_KEY, function(err, dec){
            //   console.log("Herere >>", err, dec)
              if(err){
              console.log("ERROR TOKEN >>", err)
              next();


              }else{

              console.log("DECODED TOKEN >>", dec)
                //   const decoded = null
                  req.userData=dec;
                  next();
              }

          });
}catch(error) {
    return res.status(401).json({
        message:'Auth failed'
    });
    
}
}; 
*/