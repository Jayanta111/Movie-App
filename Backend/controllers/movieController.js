import Movie from "../modules/Movie.js";

const createMovie=async(req,res)=>{
    try{
        const newMovie=new Movie(req.body);
        const savedMovie=await newMovie.save();
        res.json(savedMovie );
    }
    catch(error){
        res.status(500).json({error:error.message});

    }
};

const getAllMovie=async(req,res)=>{
    try{
const movies= await Movie.find();
res.json(movies);
}
    catch(error){
        res.status(500).json({error:error.message});
    }
};
const getSpecificMovie=async(req,res)=>{
    try{
const {id}=req.params;
const getSpecificMovie=await Movie.findById(id);
if(!getSpecificMovie){
    return res.status(404).json({message:"Movie not Found"});
};
res.json(getSpecificMovie);
    }
    catch(error){
res.status(500).json({error:error.message});
    }
};
const updateMovie=async(req,res)=>{
    try{
        const{id}=req.params;
        const updatedMovie=await Movie.findByIdAndUpdate(id,req.body,{new:true});

        if(!updatedMovie){
            return res.status(404).json({message:"Movie not found"});
        }
        res.json(updatedMovie);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};
const movieReview=async(req,res)=>{
    try{
const {rating,comment}=req.body;
const movie=await Movie.findById(req.params.id);

if(movie){
    const alreadyReviewed=movie.reviews.find(
        (r)=>r.user.toString()===req.user._id.toString()
    );
    if(alreadyReviewed){
        res.status(400);
        throw new Error("Movie already Reviewed")
    }
    const review={
        name:req.user.username,
        rating:Number(rating),
        comment,
        user:req.user._id
    }
    movie.reviews.push(review);
    movie.numReviews=movie.reviews.length;
    movie.rating=movie.reviews.reduce((acc,item)=>item.rating+acc,0)/
    movie.reviews.length;

    await movie.save();
    res.status(201).json({message:"Review Added"});

}
else
{
    res.status(404);
    throw new Error("Movie not found");
}
    }
    catch(error){
        console.error(error);
        res.status(400).json(error.message);

    }
}; 
const deleteMovie=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteMovie=await Movie.findByIdAndDelete(id);

        if(!deleteMovie){
            return res.status(404).json({message:"Movie not found"});

        }
        res.json({message:"Movie Deleted successfully"});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};
const deleteComment=async(req,res)=>{
    try{
 
        const {movieId,reviewId}=req.body;

        const movie= await Movie.findById(movieId);

        if(!movie){
            return res.status(404).json({message:"Movie not found"});
        }
        const reviewIndex=movie.reviews.findIndex((r)=>r._id.toString()===reviewId);
        if(reviewIndex===-1){
            return res.status(404).json({message:"Comment not found"});

        }
        movie.reviews.splice(reviewIndex,1);
        movie.numReviews=movie.reviews.length;
        movie.rating=movie.reviews.length > 0 ?movie.reviews.reduce((acc,item)=>item.
    rating+acc,0)/movie.reviews:0;

    await movie.save();
    res.json({message:"Comment Deleted Successfully"});
    }
    catch(error){
console.error(error);
res.status(500).json({error:error.message});
    }
};
const getNewMovie=async(req,res)=>{
    try{
const newMovie= await Movie.find().sort({createdAt:-1}).limit(10);
res.json(newMovie);
    }
    catch(error){
res.status(500).json({error: error.message});
    }
};
const getTopMovies=async(req,res)=>{
    try{
const getTopMovies=await Movie.find()
.sort({numReviews:-1})
.limit(10);
res.json(getTopMovies);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};
const getRandomMovies=async(req,res)=>{
    try{
const randomMovies=await Movie.aggregate([{$sample:{size:10}}]);
res.json(randomMovies);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
export{createMovie,getAllMovie,getSpecificMovie,updateMovie,movieReview,deleteMovie,deleteComment,getNewMovie,getTopMovies,getRandomMovies};