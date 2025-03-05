import User from '../modules/user.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
import createToken from '../utils/createToken.js';

// Create user
const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        return next(new Error("Please fill all the fields"));
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new Error("User already exists"));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Create JWT token
    const token = createToken(res, user._id);

    // Send the response with the user data and the token
    res.status(201).json({
        success: true,
        message: "User created successfully",
        token,  // Send the token back to the client
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            // Generate JWT token
            createToken(res, existingUser._id);

            res.status(200).json({
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
        } else {
            res.status(401).json({ message: "Invalid Password" });
        }
    } else {
        res.status(401).json({ message: "User not found" });
    }
});

// Logout current user
const logoutCurrentUser = asyncHandler(async (req, res) => {
    // Expire the JWT cookie
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),  // Set expiration to the past to delete the cookie
    });

    res.status(200).json({ message: "Logged out successfully" });
});
//All user view
const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({});
    res.json(users);
});
//Specific user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

const UpdateCurrentUserProfile=asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id);
if(user){
    user.username=req.body.username || user.username;
    user.email=req.body.email || user.email;
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        user.password= hashedPassword;
    }
const updatedUser= await user.save();
res.json({
    _id:updatedUser.username,
    username: updatedUser.email,
    isAdmin:updatedUser.isAdmin,
});

}
else
{
    res.status(404);
    throw new Error("User not found");

}
});


export { createUser, loginUser, logoutCurrentUser,getAllUsers,getCurrentUserProfile,UpdateCurrentUserProfile };
