import jwt from 'jsonwebtoken';
import User from '../modules/user.js';
import asyncHandler from './asyncHandler.js';

// Check Auth
const authentication = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Fixed typo in JWT_SECRET
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

// User is admin or not
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {  // Fixed typo, changed 'isadmin' to 'isAdmin'
    next();
  } else {
    res.status(401).send("Not Authorized as an Admin");
  }
};

export { authentication, authorizeAdmin };
