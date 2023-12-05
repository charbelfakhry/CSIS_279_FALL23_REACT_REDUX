import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", 
    // credentials: 'include'  // to include cookies in the request 
  }),
  /* keys under which data will be stored in the cache */
  tagTypes: ["Users"], 
  endpoints: () => ({}) // endpoints will be injected here from other files
});


