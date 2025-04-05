import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from '../../redux/api/movies';
import { toast } from 'react-toastify';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: '',
    year: '',
    detail: '',
    cast: '',
    rating: '',
    image: null,
    genre: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: initialMovieData, isLoading: isLoadingMovie } = useGetSpecificMovieQuery(id);
  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [deleteMovie, { isLoading: isDeleteMovie }] = useDeleteMovieMutation();

  useEffect(() => {
    if (initialMovieData) {
      setMovieData({
        name: initialMovieData.name,
        year: initialMovieData.year,
        detail: initialMovieData.detail, 
        cast: initialMovieData.cast.join(', '), 
        rating: initialMovieData.rating,
        image: initialMovieData.image,
        genre: initialMovieData.genre,
      });
    }
  }, [initialMovieData]);

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
      let uploadImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const uploadImageResponse = await uploadImage(formData).unwrap();
        if (!uploadImageResponse?.image) {
          throw new Error('Image upload failed');
        }
        uploadImagePath = uploadImageResponse.image;
      }

      const updatedMovie = {
        ...movieData,
        image: uploadImagePath,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        cast: movieData.cast.split(',').map((actor) => actor.trim()),
      };

      await updateMovie({ id, updateMovie: updatedMovie }).unwrap();
      toast.success('Movie updated successfully!');
      navigate('/admin/movies-list');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.data?.message || 'Failed to update movie.');
    }
  };

  if (isLoadingMovie) {
    return <div>Loading movie data...</div>;
  }

  return (
    <div className="container flex justify-center items-center mt-4">
      <form onSubmit={handleSubmit} className="w-[50rem] p-4 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-green-200 text-2xl mb-4">Update Movie</h2>

        <label className="text-green-200 mb-3">Movie Name</label>
        <input
          type="text"
          placeholder="Movie Name"
          name="name"
          value={movieData.name}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
        />

        <label className="text-green-200 mb-3">Year</label>
        <input
          type="number"
          placeholder="Year"
          name="year"
          value={movieData.year}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
        />

        <label className="text-green-200 mb-3">Details</label>
        <textarea
          placeholder="Details"
          name="detail"
          value={movieData.detail}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
        />

        <label className="text-green-200 mb-3">Cast</label>
        <input
          type="text"
          placeholder="Cast (comma-separated)"
          name="cast"
          value={movieData.cast}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
        />

        <label className="text-green-200 mb-3">Rating</label>
        <input
          type="number"
          placeholder="Rating (0-10)"
          name="rating"
          value={movieData.rating}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
          min="0"
          max="10"
        />

        <label className="text-green-200 mb-3">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 p-2 w-full"
        />

        {movieData.image && !selectedImage && (
          <img
            src={movieData.image}
            alt="Current Movie"
            className="h-40 mb-4 rounded-md"
          />
        )}

        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="h-40 mb-4 rounded-md"
          />
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
          disabled={isUpdatingMovie || isUploadingImage || isDeleteMovie}
        >
          {isUpdatingMovie || isUploadingImage || isDeleteMovie
            ? 'Updating...'
            : 'Update Movie'}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;