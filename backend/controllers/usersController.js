// Bring in User Model //
const User = require("../models/userModel.js"); 

// Bring in Note Model // 
const Note = require("../models/noteModel.js");  

// Bring in express-async-handler // 
const asyncHandler = require("express-async-handler"); 

// Bring in generateToken //
const generateToken = require("../utils/generateToken.js");





         // @desc     Register New User //
         // @route    POST  /api/users
         // @access   Public
         const registerUser = asyncHandler( async (req, res) => {
          // destructure from req.body //
      const { name, email, password, role } = req.body;

                // check if user exits //
     const userExists = await User.findOne({email});

             if (userExists) {
            res.status(400).json({message: "User already exist"})
             }

         // if user does not exit then create user //
      const user = await User.create({
          name, email, password, role:role
     });

           // check if user is created //
        if (user) {
              generateToken(res, user._id);

            res.status(201.).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              isAdmin: user.isAdmin
            })
                } else {
            res.status(400).json({message: "Invalid user data"})
        }
});



         // @desc     Authenticate User && Get Token //
         // @route    POST  /api/users/login
         // @access   Public
         // @desc     Authenticate User && Get Token //
         // @route    POST  /api/users/login
         // @access   Public
         const authUser = asyncHandler( async (req, res) => {
          // destructure from req.body //
         const {email, password} = req.body;

            // check for user //
  const user = await User.findOne({ email });

     // check if user exist && match password //
         if (user && (await user.matchPassword(password))) {
          generateToken(res, user._id);

        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isAdmin: user.isAdmin
        })
         } else {
    // if user does not exist //
    res.status(401).json({message: "Invalid email or password"})
         }
});



         // @desc     Logout User //
         // @route    POST  /api/users/logout
         // @access   Private
         const logoutUser = asyncHandler( async (req, res) => {
            res.cookie("jwt", "", {
             httpOnly: true,
             expires:new Date(0)
          });
 
          res.status(200).json({message: "Logged out successfully"});
    }); 



             // @desc   Get User Profile || Currently Logged In User  //
             // @route   Get  /api/users/profile
             // @access   Private
             const getUserProfile = asyncHandler( async (req, res) => {
              const user = await User.findById(req.user._id)

                // check for user //
               if (user) {
              res.status(200).json({
                 _id: user.id,
                 name: user.name,
                 email: user.email,
                 role: user.role,
                 isAdmin: user.isAdmin
              })
               } else {
                  res.status(404).json({message: "User not found"})
               }
   });



            // @desc    Update User Profile || Update Currently Logged In User  //
            // @route   Put  /api/users/profile
            // @access   Private
            const updateUserProfile = asyncHandler( async (req, res) => {
              const user = await User.findById(req.user._id)

                 // check for user //
              if (user) {
              user.name = req.body.name || user.name;
              user.email = req.body.email || user.email;
              user.role = req.body.role || user.role;

               // check for password //
               if (req.body.password) {
                   // set user to req.body.password //
                 user.password = req.body.password;
               }

                    // save User data //
             const updatedUser = await user.save();

               res.status(200).json({
                  _id: updatedUser._id,
                  name: updatedUser.name,
                  email: updatedUser.email,
                  role: updatedUser.role,
                  isAdmin: updatedUser.isAdmin
               });

              } else {
                 res.status(404).json({message: "User not found"})
              }
   }); 



              // @desc   Get All Users   //
              // @route   Get  /api/users
             // @access   Private/ Admin Function
            const getUsers = asyncHandler( async (req, res) => {
              const users = await User.find({});

               res.status(200).json(users);
      }); 



              // @desc   Get User By Id   //
              // @route   Get  /api/users/:id
              // @access   Private/ Admin Function
              const getUserById = asyncHandler( async (req, res) => {
                const user = await User.findById(req.params.id).select("-password");
                       // Check if user exist //
                          if (user) {
                      res.status(200).json(user);
                          } else {
                      res.status(404).json({message: "User not found"})
                          }
          }); 



             // @desc    Delete User  //
             // @route   Delete  /api/users/:id
             // @access   Private/ Admin Function
             const deleteUser = asyncHandler( async (req, res) => {
              const user = await User.findById(req.params.id);
                     // Check if user exist //
                  if (user) {
                      if(user.isAdmin) {
                    res.status(400);
                    throw new Error ("Cannot delete admin user");
                      }
                     await User.deleteOne({_id:user._id});
                     res.status(201).json({message:"user deleted successfully"});
                  } else {
                    res.status(404).json({message: "User not found"})
                  }
      });




             // @desc    Update User //
             // @route   Put  /api/users/:id
             // @access   Private/ Admin Function
            const updateUser = asyncHandler( async (req, res) => {
               const user = await User.findById(req.params.id);
                    // Check if user exist //
                        if (user) {
                       user.name = req.body.name || user.name;
                       user.email = req.body.email || user.email;
                       user.role = req.body.role || user.role;
                       user.isAdmin = Boolean(req.body.isAdmin);

                     const updatedUser = await user.save();
                         res.status(200).json({
                        _id: updatedUser._id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        role: updatedUser.role,
                        isAdmin: updatedUser.isAdmin,
                     })
                       } else {
                     res.send(404).json({message: "User not found"})
                   }
       });

       
module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
}