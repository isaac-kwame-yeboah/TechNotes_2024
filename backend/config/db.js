  // Bring in mongoose //
  const mongoose = require("mongoose")


    // Connect DB function //
  const connectDB = async () => {
      try{
        const conn =  await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`.bgGreen.blue.underline)
      } catch(error){
        console.log(`Error: ${error.message}`.red.underline.bold)
        // exit with failure //
        process.exit(1)
      }
  }


  module.exports = connectDB
