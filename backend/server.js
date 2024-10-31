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

// Initialize express app //
const app = express();

// Form Body Parser Middleware //
app.use(express.json());  // send raw json //
app.use(express.urlencoded({ extended:true }));  // URL encoded //

// use cookie parser middleware //
app.use(cookieParser());

  // Set Static Folder //
app.use("/", express.static(path.join(__dirname, "/public"))); 

// Root Route //
app.use("/", require("./routes/root"));

// 404 Page Route // 
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
     res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if (req.accepts("json")) {
      res.json({message:"404 Not Found"})
    } else {
        res.type("txt").send("404 Not Fouund")
    }
})


// Use errorHandler middleware //

// Set port //
const PORT = process.env.PORT || 7500

// Start server //
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`.yellow.underline);
});
