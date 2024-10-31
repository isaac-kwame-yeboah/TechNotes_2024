// Destructure format // 
const { format } = require("date-fns"); 

// Destructure uuid // 
const {v4: uuid} = require("uuid"); 

// FileSystem (fs) module // 
const fs = require("fs"); 

// fsPromises // 
const fsPromises = require("fs").promises

// Bring in paht module //
const path = require("path");


// Helper function(logEvents) // 
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

     try {
         // if directory exist // 
         if (!fs.existsSync(path.join(__dirname, "..", "logs")))
              // if directory does not exist then we create it //  
 await fsPromises.mkdir(path.join(__dirname, "..", "logs")) // directory created !!

           // append log file // 
 await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem)

     } catch (err) {
        console.log(err);
     } 
}

  // Actual Middleware // 
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`);
    next();
}


module.exports = {
    logEvents, 
    logger
}


/* 
 Notes::
/t => are tabs which makes logs easily to  import to ms-excel.
/n =>  creates a new line.
reqLog.log => is a text file containing all our logs info which is a convention for writing logs.

*/  