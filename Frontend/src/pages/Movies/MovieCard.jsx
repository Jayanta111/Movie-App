import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group m-[2rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[20rem] h-[30rem] object-cover rounded transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>
      <p className="absolute top-[80%] left-[2rem] right-0 bottom-0 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
