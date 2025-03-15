import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create Genre
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${GENRE_URL}`,
                method: "POST",
                body: newGenre,
            }),
        }),

        // Update Genre
        updateGenre: builder.mutation({
            query: ({ id, updateGenre }) => ({
                url: `${GENRE_URL}/${id}`,
                method: "PUT",
                body: updateGenre,
            }),
        }),

        // Delete Genre
        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: "DELETE",
            }),
        }),

        // Fetch Genres (FIXED)
        fetchGenres: builder.query({
            query: () => `${GENRE_URL}`, // ✅ Fixed API path
        }),
    }),
});

export const { 
    useCreateGenreMutation, 
    useUpdateGenreMutation, 
    useDeleteGenreMutation, 
    useFetchGenresQuery 
} = genreApiSlice;
