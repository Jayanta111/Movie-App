import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useAddMovieReviewMutation,
  useGetSpecificMovieQuery,
} from '../../redux/api/movies';

function MovieDetails() {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const [createReview, { isLoading: loadingReview }] = useAddMovieReviewMutation();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      toast.error('Please fill in both rating and comment');
      return;
    }

    try {
      await createReview({
        movieId,
        reviews: {
          rating: Number(rating),
          comment,
          name: userInfo.name,
        },
      }).unwrap();

      toast.success('Review submitted successfully!');
      setRating('');
      setComment('');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit review');
    }
  };

  const handlePlay = () => {
    if (movie?.videoUrl) {
      window.open(movie.videoUrl, '_blank');
    }
  };

  const handleResume = () => {
    if (movie?.videoUrl) {
      // Replace with your logic to resume from last watched timestamp if available
      window.open(movie.videoUrl, '_blank');
    }
  };

  return (
    <div className="text-white">
      <Link to="/" className="text-white font-semibold hover:underline ml-[20rem]">
        ← Go Back
      </Link>

      <div className="mt-8">
        {/* Movie Poster */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={movie?.image || '/placeholder.jpg'}
            alt={movie?.name || 'Movie Poster'}
            className="w-[30%] rounded shadow-lg"
          />

          {movie?.videoUrl && (
            <div className="flex gap-4">
              <button
                onClick={handlePlay}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
              >
                ▶ Play
              </button>
              <button
                onClick={handleResume}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
              >
                ⏯ Resume
              </button>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="container flex justify-between ml-[20rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl font-extrabold mb-4">{movie?.name}</h2>
            <p className="text-[#B0B0B0] mb-4 xl:w-[35rem]">{movie?.detail}</p>
            <p className="text-2xl font-semibold">
              Releasing Date: {movie?.year || 'N/A'}
            </p>
          </section>
        </div>

        {/* Cast */}
        {movie?.cast?.length > 0 && (
          <div className="mt-8 ml-[20rem] max-w-3xl">
            <h3 className="text-3xl font-bold mb-4">Cast</h3>
            <ul className="list-disc list-inside text-gray-300">
              {movie.cast.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-12 ml-[20rem] max-w-3xl">
          <h3 className="text-3xl font-bold mb-4">
            Reviews ({movie?.reviews?.length || 0})
          </h3>
          {movie?.reviews?.length > 0 ? (
            <ul className="space-y-4">
              {movie.reviews.map((rev) => (
                <li
                  key={rev._id}
                  className="bg-gray-800 p-4 rounded shadow-md border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{rev.name}</span>
                    <span className="text-yellow-400 font-semibold">
                      ⭐ {rev.rating}/5
                    </span>
                  </div>
                  {rev.createdAt && (
                    <p className="text-sm text-gray-400 mb-2">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  )}
                  <p className="text-gray-300">{rev.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Leave a Review */}
        {userInfo ? (
          <div className="mt-12 ml-[20rem] max-w-3xl">
            <h3 className="text-2xl font-semibold mb-2">Leave a Review</h3>
            <form
              onSubmit={handleReviewSubmit}
              className="bg-gray-800 p-4 rounded shadow space-y-4"
            >
              <div>
                <label className="block mb-1">Rating</label>
                <select
                  className="w-full p-2 bg-black text-white border border-gray-600 rounded"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Comment</label>
                <textarea
                  className="w-full p-2 bg-black text-white border border-gray-600 rounded"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loadingReview}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
              >
                {loadingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        ) : (
          <p className="ml-[20rem] text-gray-400 mt-8">
            Please{' '}
            <Link to="/login" className="text-green-400 underline">
              login
            </Link>{' '}
            to write a review.
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
