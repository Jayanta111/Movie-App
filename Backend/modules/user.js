import mongoose from "mongoose";

// Define user schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false 
  },
}, { timestamps: true });  

// Create model
const User = mongoose.model("User", userSchema);

export default User;
