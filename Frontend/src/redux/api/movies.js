import { apiSlice } from './apiSlice';
import { MOVIE_URL, UPLOAD_URL } from '../constants';
import { createMovie, deleteComment, deleteMovie, getAllMovie, getNewMovie, getRandomMovies, getSpecificMovie, getTopMovies, updateMovie } from '../../../../Backend/controllers/movieController';
export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all movies
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),

    // Create a new movie
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: 'POST',
        body: newMovie,
      }),
    }),

    // Update an existing movie
    updateMovie: builder.mutation({
      query: ({ id, updateMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: 'PUT',
        body: updateMovie,
      }),
    }),

    // Add movie review
    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
    }),

    // Delete a comment
    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/${movieId}/delete-comment/${reviewId}`,
        method: 'DELETE',
      }),
    }),

    // Delete a movie
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: 'DELETE',
      }),
    }),

    // Get a specific movie
    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),

    // Upload an image
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: formData,
      }),
    }),

    // Get new movies
    getNewMovie: builder.query({
      query: () => `${MOVIE_URL}/new-movies`,
    }),

    // Get top-rated movies
    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),

    // Get random movies
    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,
  useGetNewMovieQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = moviesApiSlice;
