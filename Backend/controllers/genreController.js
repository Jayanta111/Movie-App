import Genre from '../modules/Genre.js';
import asyncHandler from '../middlewares/asyncHandler.js';

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

export  {createGenre};
