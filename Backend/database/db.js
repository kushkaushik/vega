const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB Connected Successfully");
    } catch (err) {
    
      console.log("MongoDB Connection Error:", err.message);
      throw new Error(err)
    }
  };
  
module.exports = dbConnection;