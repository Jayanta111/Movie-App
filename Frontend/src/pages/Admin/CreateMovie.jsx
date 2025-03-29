import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation, useUploadImageMutation } from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import { toast } from 'react-toastify';

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: '',
    year: '',
    detail: '',
    cast: '',
    rating: '',
    genre: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageError }] = useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres && genres.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || '',
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let uploadImagePath = null;
  
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
  
        const uploadImageResponse = await uploadImage(formData).unwrap();
        if (uploadImageResponse.data) {
          uploadImagePath = uploadImageResponse.data.image;
        } else {
          console.log('Uploaded image response:', uploadImageResponse);
          toast.error('Failed to upload image.');
          return;
        }
      }
  
      const movie = {
        ...movieData,
        image: uploadImagePath,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        cast: movieData.cast.split(",").map((actor) => actor.trim()),
      };
  
      console.log("Final Movie Data:", movie);
  
      await createMovie(movie).unwrap(); // ✅ Correct variable used here
      toast.success('Movie created successfully!');
      navigate('/admin/movies-list');
  
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.data?.message || 'Failed to create movie.');
    }
  };
  

  return (
    <div className="container flex justify-center items-center mt-4">
      <form onSubmit={handleSubmit} className="w-[50rem] p-4 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-green-200 text-2xl mb-4">Create Movie</h2>

        <input type="text" placeholder="Movie Name" name="name" value={movieData.name} onChange={handleChange} className="mb-4 p-2 w-full" />

        <input type="number" placeholder="Year" name="year" value={movieData.year} onChange={handleChange} className="mb-4 p-2 w-full" />

        <textarea placeholder="Details" name="detail" value={movieData.detail} onChange={handleChange} className="mb-4 p-2 w-full" />

        <input type="text" placeholder="Cast (comma-separated)" name="cast" value={movieData.cast} onChange={handleChange} className="mb-4 p-2 w-full" />

        <input type="number" placeholder="Rating (0-10)" name="rating" value={movieData.rating} onChange={handleChange} className="mb-4 p-2 w-full" min="0" max="10" />

        <select name="genre" value={movieData.genre} onChange={handleChange} className="mb-4 p-2 w-full">
          {isLoadingGenres ? (
            <option>Loading genres...</option>
          ) : genres && genres.length > 0 ? (
            genres.map((genre) => <option key={genre._id} value={genre._id}>{genre.name}</option>)
          ) : (
            <option>No genres available</option>
          )}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 p-2 w-full" />

        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="h-40 mb-4 rounded-md" />}

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50" disabled={isCreatingMovie || isUploadingImage}>
          {isCreatingMovie || isUploadingImage ? 'Submitting...' : 'Create Movie'}
        </button>

        {createMovieError && <p className="text-red-500 mt-2">Failed to create movie.</p>}
        {uploadImageError && <p className="text-red-500 mt-2">Failed to upload image.</p>}
      </form>
    </div>
  );
};

export default CreateMovie;
