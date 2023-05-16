import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('token', `${token}`);
        }
        return headers;
    },
});

export const api = createApi({
    baseQuery,
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
    })
});






export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } = api;