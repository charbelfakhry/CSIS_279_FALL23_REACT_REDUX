import {apiSlice } from "./apiSlice"

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // to retrieve messages with another user
        getUsers: builder.query<unknown, void>({
            query: () => `https://jsonplaceholder.typicode.com/todos/1`,
            providesTags: ['Users']
        }),
    })
})

export const {useGetUsersQuery, } = userSlice