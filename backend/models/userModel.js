// Bring in mongoose // 
const mongoose = require("mongoose");





 // Create User_Schema //  
 const userSchema = new mongoose.Schema({
       // Form fields for User Model // 

    username:{
        type: String,
        required: true
    },

    password:{
      type: String,
      required: true
    },

    roles:[{
      type: String,
      default: "Employee"
    }],

       // Active status of employee // 
    active:{
        type: Boolean,
        default: true
      },

      createdAt:{
        type: Date,
        default: Date.now
      }

 })  


 module.exports = mongoose.model("User", userSchema);