import React, { useState } from 'react';
import {
  useGetNewMovieQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import SliderUtil from '../../component/SliderUtil';

const MoviesContainerPage = () => {
  const { data } = useGetNewMovieQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter((movie) => selectedGenre===null || movie.genre === selectedGenre) || [];
  
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-start">
      <nav className="ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row flex-wrap">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            onClick={() => handleGenreClick(genre._id)}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] md:mb-2 text-lg ${
              selectedGenre === genre._id ? 'text-teal-400 font-semibold' : ''
            }`}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5 text-2xl font-bold">Choose For You</h1>
          <SliderUtil data={randomMovies || []} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5 text-2xl font-bold">Top Movies</h1>
          <SliderUtil data={topMovies || []} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5 text-2xl font-bold">Choose Movie</h1>
          <SliderUtil data={filteredMovies || []} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
