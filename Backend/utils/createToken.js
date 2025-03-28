import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",  // Fixed the comparison here
    sameSite: "Strict",  // Fixed "strick" to "Strict"
    maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in milliseconds
  });
};

export default generateToken;
