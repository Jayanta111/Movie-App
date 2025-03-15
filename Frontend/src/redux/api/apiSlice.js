import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
const GENRE_URL = '/api/v1/genre';  
const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});


export const apiSlice = createApi({
    baseQuery,
    endpoints:()=>({}),

});