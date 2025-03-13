import express from 'express';
const router=express.Router();


// Controllers
import {createGenre} from "../controllers/genreController.js";
//Middlewares

import { authentication,authorizeAdmin } from '../middlewares/authMiddileware.js';
router.route("/").post(authentication,authorizeAdmin,createGenre);


export default router;