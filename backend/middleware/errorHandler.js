 // Custom errorHandler //  

// Bring in logEvents // 
const { logEvents } = require("./logger.js"); 


// errorHandler // 
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
     console.log(err.stack)

   const status = res.statusCode ? res.statusCode : 500 // Internal server error //  
      // set status // 
      res.status(status);
 
       // response in json data // 
      res.json({message:err.message});

} 




module.exports = errorHandler;