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
    unique: true,  // email should be unique
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false // Default is false for new users
  },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Create model
const User = mongoose.model("User", userSchema);

export default User;
