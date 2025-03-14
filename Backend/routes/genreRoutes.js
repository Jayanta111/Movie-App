import express from 'express';
const router = express.Router();

// Controllers
import { createGenre,
     updateGenre,
     removeGenre,listGenres,readGenre } from "../controllers/genreController.js";

// Middlewares
import { authentication, authorizeAdmin } from '../middlewares/authMiddileware.js';

// Routes
router.route("/")
  .post(authentication, authorizeAdmin, createGenre);  // Route for creating a genre

router.route("/:id")
  .put(authentication, authorizeAdmin, updateGenre);   // Route for updating a genre
router.route("/:id").delete(authentication,authorizeAdmin,removeGenre);
router.route("/genres").get(listGenres);
router.route('/:id').get(readGenre);
export default router;
