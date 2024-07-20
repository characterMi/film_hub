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
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/film_hub%23%2Fprofile`;
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
      localStorage.setItem("session_id", session_id);
      if (session_id) {
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

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
