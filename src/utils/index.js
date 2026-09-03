import axios from "axios";
import { toast } from "react-toastify";

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get("/authentication/token/new");
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/film_hub%23%2F`;
    }
  } catch (err) {
    toast.error("Sorry, your token could not be created.");
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem("request_token");

  if (token) {
    try {
      const {
        data: { session_id },
      } = await moviesApi.post("authentication/session/new", {
        request_token: token,
      });

      if (session_id) {
        localStorage.setItem("session_id", session_id);
        toast.success("You Logged in successfully !");
      } else {
        toast.error("Sorry, there was an error !");
      }
      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getMovieDefaultState = async (
  movieId,
  listName,
  accountId,
  type = "movie"
) => {
  const sessionId = localStorage.getItem("session_id");
  const url = `https://api.themoviedb.org/3/account/${accountId}/${listName}/${
    type === "tv" ? "tv" : "movies"
  }?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`;

  const { data } = await axios.get(url + "&page=1");

  if (!data) return false;

  const checkIfMovieIsInPlaylist = (movies) =>
    movies?.some((movie) => movie.id === movieId);

  if (checkIfMovieIsInPlaylist(data.results)) {
    return true;
  }

  if (!isNaN(data.total_pages) && data.total_pages > 1) {
    for (let page = 2; page <= data.total_pages; page++) {
      const { data } = await axios.get(url + `&page=${page}`);

      if (checkIfMovieIsInPlaylist(data.results)) {
        return true;
      }
    }
  }

  return false;
};
