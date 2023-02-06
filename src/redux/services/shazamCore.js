import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath:'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers)=> {
            headers.set('X-RapidAPI-Key', '4803f68b69mshb9beb51f70f57cep1266f7jsn198d554ca1d4');
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({query:()=> '/charts/track'})
    }),
});

export const {useGetTopChartsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery } = shazamCoreApi;
