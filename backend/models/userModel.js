// Bring in mongoose // 
const mongoose = require("mongoose"); 

// Bring in bcrypt // 
const bcrypt = require("bcrypt");





 // Create User_Schema //  
 const userSchema = new mongoose.Schema({
       // Form fields for User Model // 

    name:{
        type: String,
        required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ] // regular expression //
    },

    password:{
      type: String,
      required: true
    },

    role:{
      type: String,
      enum:["Employee", "Manager"], // enum Refer to only to the role types available && select only 1 role //
      default: "Employee"
    },

    isAdmin:{
      type: Boolean,
      required: true,
      default: false,
    },

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

 
    // Encrypt password using bcrypt //
    userSchema.pre("save", async function (next){
      if(!this.isModified("password")) {
          next();
      }

      // generate salt to hashed password using genSalt method //
  const salt = await bcrypt.genSalt(10);

          // hash password with salt //
   this.password = await bcrypt.hash(this.password, salt)
})

     // match user entered password to hashed password in database //
  userSchema.methods.matchPassword = async function(enteredPassword){
    // compare plain text password to the hash password //
return await bcrypt.compare(enteredPassword, this.password)
}


 module.exports = mongoose.model("User", userSchema);