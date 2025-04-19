import axios from "axios";

export const getMoviesBySearchQuery = async (query, type) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=1`
    );
    const result = data.results ?? [];
    return {
      message: result.length > 0 ? null : "No movie found for the given query.",
      data: result,
    };
  } catch (err) {
    console.error(err);
    let message = "";

    if (err.code === "ERR_NETWORK")
      message = err.message + ". try again later.";
    else message = "an Error occurred, try again.";

    return { message, data: [] };
  }
};
