import Genre from '../modules/Genre.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Create Genre
const createGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const existingGenre = await Genre.findOne({ name });

        if (existingGenre) {
            return res.status(400).json({ success: false, message: "Genre already exists" });
        }

        const newGenre = await Genre.create({ name });

        res.status(201).json({ success: true, message: "Genre created successfully", genre: newGenre });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Update Genre
const updateGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const genre = await Genre.findOne({ _id: id });

        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }

        genre.name = name;
        const updatedGenre = await genre.save();

        res.status(200).json({ success: true, message: "Genre updated successfully", genre: updatedGenre });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Remove Genre
const removeGenre = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Attempt to find and delete the genre by its ID
        const removedGenre = await Genre.findByIdAndDelete(id);

        // If the genre isn't found, return a 404 error
        if (!removedGenre) {
            return res.status(404).json({ error: "Genre not found" });
        }

        // Return a success response with the deleted genre
        res.status(200).json({
            success: true,
            message: "Genre deleted successfully",
            genre: removedGenre,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// List all Genres
const listGenres = asyncHandler(async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.status(200).json(genres); 
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch genres" });
      }
});
//Read Genre
const readGenre=asyncHandler(async(req,res)=>{
    try{
const genre = await Genre.findOne({_id: req.params.id});
res.json(genre);
    }
    catch(error){
console.log(error);
return res.status(400).json(error.message);
    }
});

export { createGenre, updateGenre,removeGenre,listGenres,readGenre };
