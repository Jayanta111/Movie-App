import express from 'express'
import { createUser,loginUser,logoutCurrentUser ,getAllUsers,
getCurrentUserProfile,
UpdateCurrentUserProfile} from '../controllers/userController.js';
//controllers




//middle
import {authentication,authorizeAdmin} from '../middlewares/authMiddileware.js';

const router=express.Router();

router.route("/").post(createUser).get(authentication,authorizeAdmin,getAllUsers);
router.route("/").post(createUser);
router.post("/auth",loginUser);
router.post("/logout", logoutCurrentUser);
router.route("/profile").get(authentication,getCurrentUserProfile).put(authentication,UpdateCurrentUserProfile);
export default router;