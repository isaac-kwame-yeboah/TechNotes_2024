// Bring in express //
const express = require("express");  

// Express Router // 
const router = express.Router(); 

// Bring in user controller functions // 
const {getAllUsers,
        createNewUser,
        updateUser,
        deleteUser} = require("../controllers/usersController");



// Get All Users // 
router.get("/", getAllUsers)

// Register User Route // 
router.post("/", createNewUser) 
 
//  Delete User //
router.delete("/", deleteUser)

 // Update User Profile // 
 router.patch("/", updateUser)



 module.exports = router  