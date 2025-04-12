import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: "",
    },
    filteredMovies: [],
    movieYear: [],
    uniqueYear: [],
    genres: [], 
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilterMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMovieYear: (state, action) => {
      state.movieYear = action.payload;
    },
    setUniqueYear: (state, action) => {
      state.uniqueYear = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setFilterMovies,
  setMovieYear,
  setUniqueYear,
  setGenres, 
} = moviesSlice.actions;

export default moviesSlice.reducer;
