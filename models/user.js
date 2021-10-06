const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    full_name: { 
        type: String, default: null 
    },
    email: { 
        type: String, unique: true 
    },
    password: { 
        type: String 
    },
    isAdmin: { 
        type: Boolean, default: false 
    },
  });

  module.exports = mongoose.model("User", userSchema);