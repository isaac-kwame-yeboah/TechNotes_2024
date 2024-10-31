// Bring in express //
const express = require("express"); 

// Bring in path module // 
const path = require("path");

// Bring in dotenv //
const dotenv = require("dotenv").config(); 

// Bring in colors //
const colors = require("colors"); 

// Bring in cookie-parse //
const cookieParser =  require("cookie-parser");  

// Bring in cors //
const cors = require('cors');

// Bring in cors_options // 
const corsOptions = require("./config/corsOptions.js")

// Bring in logEvents && logger middleware // 
const { logger } = require("./middleware/logger.js"); 

// Bring in errorhandler Middleware // 
const errorHandler = require("./middleware/errorHandler.js")


// Initialize express app //
const app = express();

// use logger middleware // 
app.use(logger);

// use cors // 
app.use(cors(corsOptions)); 



// Form Body Parser Middleware //
app.use(express.json());  // send raw json //
app.use(express.urlencoded({ extended:true }));  // URL encoded //

// use cookie parser middleware //
app.use(cookieParser());

  // Set Static Folder //
app.use("/", express.static(path.join(__dirname, "public"))); 

// Home || Root Route //
app.use("/", require("./routes/root"));

// 404 Page Route // 
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
     res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({message:"404 Not Found"});
    } else {
        res.type("txt").send("404 Not Fouund");
    }
})


// Use errorHandler middleware //
app.use(errorHandler);

// Set port //
const PORT = process.env.PORT || 7500

// Start server //
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`.yellow.underline);
});
