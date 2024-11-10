// Bring in express //
const express = require("express");  

// Express Router // 
const router = express.Router(); 

// Bring in user controller functions // 
const { registerUser,
        authUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        getUsers,
        getUserById,
        deleteUser,
        updateUser
       } = require("../controllers/usersController"); 

  // Bring in protect && admin middleware //
  const { protect, admin } =  require("../middleware/authMiddleware.js");


       // Get All Users //
router.get("/", protect, admin, getUsers)

       // Register User Route //
router.post("/", registerUser)

    // Logout User Route //
router.post("/logout", logoutUser)

     // Login User Route //
 router.post("/login", authUser)

   // Get User Profile //
  router.get("/profile", protect, getUserProfile)

  // Update User Profile //
 router.put("/profile", protect, updateUserProfile) 

 // Get Single User //
 router.get("/:id", protect, admin, getUserById)

 // Delete User //
 router.delete("/:id", protect, admin, deleteUser)

 // Update User //
 router.put("/:id", protect, admin, updateUser)

  


 


 module.exports = router  