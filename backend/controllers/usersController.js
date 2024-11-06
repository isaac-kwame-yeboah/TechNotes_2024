// Bring in User Model //
const User = require("../models/userModel.js"); 

// Bring in Note Model // 
const Note = require("../models/noteModel.js");  

// Bring in express-async-handler // 
const asyncHandler = require("express-async-handler");

// Bring in bcrypt // 
const bcrypt = require("bcrypt");




              // @desc    Get All Users   //
              // @route   Get  /api/users  // 
              // @access  Private/ Admin Function // 
 const getAllUsers = asyncHandler(async(req, res) => { 
    const users = await User.find({}).select("-password").lean();

           // check if user exist // 
          if (!users?.length) {
           return res.status(400).json({message: "No users found"});
          } 

            // if users exist return users in json format // 
          res.json(users);

 }) 




              // @desc    Create || Register New User //
              // @route   Post  /api/users  // 
              // @access  Private/ Admin Function // 
const createNewUser = asyncHandler(async(req, res) => { 
            // destructure data from req.body //  
        const { username, password, roles} = req.body;

            // confirm data // 
        if (!username || !password || !Array.isArray(roles) || !roles.length) {
            return res.status(400).json({message: "All fields are required!"})
        }  

          // check for duplicate // 
        const duplicate = await User.findOne({username}).lean().exec(); 

                if (duplicate) { 
              return res.status(409).json({message: "Duplicate username"})
                }

                // hash password // 
        const hashedPassword = await bcrypt .hash(password, 10); 

            // define user object //
       const userObject = { username, "password": hashedPassword, roles }

            // create && store new user // 
      const user = await User.create(userObject); 

               // check if user is created // 
                 if (user) {
                res.status(201).json({message: `New user ${username} created`})
                 } else {
                  res.status(400).json({messsage: "Invalid user data recieved"})
                 }

 })  




              // @desc    Update User //
              // @route   Patch  /api/users  // 
              // @access  Private/ Admin Function // 
const updateUser = asyncHandler(async(req, res) => { 
          const { id, username, roles, active, password } = req.body;

                   // confirm data || check if user data exist // 
      if (!id || !username || !Array.isArrray(roles) || !roles.length || typeof active !== "boolean") {
         return res.status(400).json({message: "All fields are required!"})
      }

           // define user || check for user // 
        const user = await User.findById(id).exec();
                     if (!user) {
                   return res.status(400).json({message: "User not found"})
                     } 

                // check for duplicate // 
             const duplicate = await User.findOne({username}).lean().exec();
                // allow updates to the original user // 
                if (duplicate && duplicate?._id.toString() !== id) {
                 return res.status(409).json({message: "Duplicate username"})
                } 

                // update user object //  
         user.username = username
         user.roles = roles
         user.active = active

               if (password){
            // hash password //  
            user.password = await bcrypt.hash(password, 10);
               }
 
                  // save updated User // 
            const updatedUser = await User.save(); 

          res.json({message: `${updatedUser.username} updated `})

})


              // @desc    Delete User //
              // @route   Delete  /api/users/:id // 
              // @access  Private/ Admin Function // 
const deleteUser = asyncHandler(async(req, res) => { 
            // destructure id from req.body //  
       const { id } = req.body;

             // check for id //
           if (!id) {
      return res.status(400).json({mesage: "User ID Required"})
           } 

            // dont delete user with notes assinged // 
      const notes = await Note.findOne({user:id}).lean().exec(); 

          if (notes?.length) {
           return res.status(400).json({message: "User has assigned notes"})
         }

            // define user // 
        const user = await User.findById(id).exec();

            if (!user) {
          return res.status(400).json({message: "User not found"})
            } 

             // if user exist //
      const result  = await user.deleteOne(); 

      const reply = `Username ${result.username} with ID ${result._id} deleted`;

          res.json(reply);

})
 

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}