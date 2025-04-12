import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import banner from '../../assets/banner.jpg';
import MovieCard from './MovieCard';

import {
  useGetAllMoviesQuery,
  useGetNewMovieQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from '../../redux/api/movies';

import {
  setMoviesFilter,
  setFilterMovies,
  setMovieYear,
  setUniqueYear,
} from '../../redux/features/movies/moviesSlice';

import { useFetchGenresQuery } from '../../redux/api/genre';

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data: allMovies } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();

  const { filteredMovies, uniqueYear, moviesFilter } = useSelector(
    (state) => state.movies
  );

  // Populate Redux state when allMovies load
  useEffect(() => {
    if (allMovies) {
      const years = allMovies.map((movie) => movie.year);
      const unique = Array.from(new Set(years));
      dispatch(setFilterMovies(allMovies));
      dispatch(setMovieYear(years));
      dispatch(setUniqueYear(unique));
    }
  }, [allMovies, dispatch]);

  // Unified filter function
  const applyFilters = ({ searchTerm, selectedGenre, selectedYear, selectedSort }) => {
    let filtered = [...(allMovies || [])];

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre);
    }

    if (selectedYear) {
      filtered = filtered.filter((movie) => movie.year === Number(selectedYear));
    }

    if (selectedSort === 'Top Movies') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Random movies') {
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    dispatch(setFilterMovies(filtered));
  };

  // Handlers
  const handleSearchChange = (e) => {
    const newFilter = { ...moviesFilter, searchTerm: e.target.value };
    dispatch(setMoviesFilter(newFilter));
    applyFilters(newFilter);
  };

  const handleGenreChange = (e) => {
    const newFilter = { ...moviesFilter, selectedGenre: e.target.value };
    dispatch(setMoviesFilter(newFilter));
    applyFilters(newFilter);
  };

  const handleYearChange = (e) => {
    const newFilter = { ...moviesFilter, selectedYear: e.target.value };
    dispatch(setMoviesFilter(newFilter));
    applyFilters(newFilter);
  };

  const handleSortChange = (e) => {
    const newFilter = { ...moviesFilter, selectedSort: e.target.value };
    dispatch(setMoviesFilter(newFilter));
    applyFilters(newFilter);
  };

  const handleScrollToMovies = () => {
    const movieSection = document.getElementById('movies-section');
    if (movieSection) {
      movieSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-white">
      {/* Banner Section */}
      <section
        className="relative h-[40rem] w-full mb-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-70" />
        <div className="relative z-10 text-white text-center pt-40 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to Movie World</h1>
          <p className="text-xl md:text-2xl mb-6">
            Discover the latest and greatest movies from around the world.
          </p>
          <button
            onClick={handleScrollToMovies}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <input
          type="text"
          className="w-full h-12 border px-4 mb-4 rounded outline-none text-black"
          placeholder="Search Movies"
          value={moviesFilter.searchTerm}
          onChange={handleSearchChange}
        />

        <div className="flex gap-4 flex-wrap">
          <select
            className="border p-2 rounded text-black"
            value={moviesFilter.selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded text-black"
            value={moviesFilter.selectedYear}
            onChange={handleYearChange}
          >
            <option value="">All Years</option>
            {uniqueYear?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded text-black"
            value={moviesFilter.selectedSort}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="All Movies">All Movies</option>
            <option value="Top Movies">Top Movies</option>
            <option value="Random movies">Random Movies</option>
          </select>
        </div>
      </section>

      {/* Movies Grid */}
      <div id="movies-section" className="container mx-auto px-4 mb-20">
        {filteredMovies?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
