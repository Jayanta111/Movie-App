import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation, useUploadImageMutation } from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import { toast } from 'react-toastify';

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: '',
    year: 0,
    detail: '',
    cast: [],
    rating: 0,
    image: null,
    genre: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetail }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetail }] = useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres && genres.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || ""
      }));
    }
  }, [genres]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
        
        {/* Name Field */}
        <div className="mb-4">
          <label className="block">
            Name:
            <input 
              type="text" 
              name="name" 
              value={movieData.name} 
              onChange={handleChange}
              className="border px-2 py-1 w-full" 
            />
          </label>
        </div>

        {/* Year Field */}
        <div className="mb-4">
          <label className="block">
            Year:
            <input 
              type="number" 
              name="year" 
              value={movieData.year} 
              onChange={handleChange}
              className="border px-2 py-1 w-full" 
            />
          </label>
        </div>

        {/* Detail Field */}
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail" 
              value={movieData.detail} 
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            ></textarea>
          </label>
        </div>

        {/* Cast Field */}
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input 
              type="text" 
              name="cast" 
              value={movieData.cast.join(", ")} 
              onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(",") })}
              className="border px-2 py-1 w-full" 
            />
          </label>
        </div>

{/* Genre Field */}
<div className="mb-4">
  <label className="block">
    Genre:
    <select 
      name="genre" 
      value={movieData.genre} 
      onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })}
      className="border px-2 py-1 w-full" 
    >
      {isLoadingGenres ? (
        <option>Loading genres...</option>
      ) : !genres || genres.length === 0 ? (
        <option>No genres available</option>
      ) : Array.isArray(genres) ? (
        genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))
      ) : Array.isArray(genres.data) ? (
        genres.data.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))
      ) : (
        <option>Error loading genres</option>
      )}
    </select>
  </label>
</div>

      </form>
    </div>
  );
};

export default CreateMovie;
