import axios from "axios";

export const getMoviesBySearchQuery = async (query, type) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=1`
    );
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};
