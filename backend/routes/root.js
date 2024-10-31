// Bring in express //
const express = require("express");  

// Express Router // 
const router = express.Router();

// Bring in path module // 
const path = require("path"); 


router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html")) 
})



module.exports = router;