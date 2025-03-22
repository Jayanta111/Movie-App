import express from "express";
const router=express.Router();

//controller
import {createMovie,getAllMovie,
    getSpecificMovie,updateMovie,
    movieReview,deleteMovie,
    deleteComment,getNewMovie,
    getTopMovies,getRandomMovies

} from "../controllers/movieController.js";
//Middlewares


import { authentication,authorizeAdmin } from "../middlewares/authMiddileware.js";
import checkId from "../middlewares/checkId.js";

//Public Routes
router.get("/all-movies",getAllMovie);
router.get('/specific-movie/:id',getSpecificMovie);
router.get('/new-movies',getNewMovie);
router.get('/top-movies',getTopMovies);
router.get('/random-movies',getRandomMovies)
//Restricted Route
router.post('/:id/reviews',authentication,checkId,movieReview)

//Admin
router.post('/create-movie',authentication,authorizeAdmin,createMovie);
router.put('/update-movie/:id',authentication,authorizeAdmin,updateMovie);
router.delete('/delete-movie/:id',authentication,authorizeAdmin,deleteMovie)
router.delete("/delete-comment",authentication,authorizeAdmin,deleteComment)
export default router;