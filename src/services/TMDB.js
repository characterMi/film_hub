import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // * Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${API_KEY}`,
    }),

    // * Get Movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${API_KEY}`;
        }

        // Get Movies by Categories
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${API_KEY}`;
        }

        // Get Movies by Genre Id
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_KEY}`;
        }
        // Get Movies by Default
        return `movie/popular?page=${page}&api_key=${API_KEY}`;
      },
    }),

    // * Get Movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),

    // * Get User Specific List

    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`,
    }),

    // * Get Recommendations

    getRecommendations: builder.query({
      query: ({ movieId, page, list }) =>
        `/movie/${movieId}/${list}?page=${page}&api_key=${API_KEY}`,
    }),

    // * Get Actor Details
    getActorDetail: builder.query({
      query: (id) => `person/${id}?api_key=${API_KEY}`,
    }),

    // * Get Actor Movies
    getActorMovies: builder.query({
      query: ({ id, page }) =>
        `discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorDetailQuery,
  useGetActorMoviesQuery,
} = tmdbApi;
