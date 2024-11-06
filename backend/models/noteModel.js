// Bring in mongoose // 
const mongoose = require('mongoose');

// Bring in AutoIncrement // 
const AutoIncrement = require('mongoose-sequence')(mongoose);




 // Create Note_Schema //  
 const noteSchema = new mongoose.Schema({
       // Form fields for Note Model // 


           // User Relationship with Note_Model //
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // User Model || User Collection //
        required:true
     },

    title:{
      type: String,
      required: true
    },

    text:{
        type: String,
        required: true
      },

    completed:{
        type: Boolean,
        default: true
      },

      createdAt:{
        type: Date,
        default: Date.now
      }


 })  

    // Plugin for AutoIncrement // 
 noteSchema.plugin(AutoIncrement, {
    inc_field: "ticket",
    id: "ticketNums",
    start_seq: 500
 }) 

 module.exports = mongoose.model("Note", noteSchema);