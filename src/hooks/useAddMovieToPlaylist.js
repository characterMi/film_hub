import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../features/auth";
import { getMovieDefaultState } from "../utils";
import { useAppType } from "./useAppType";

export const useAddMovieToPlaylist = (data) => {
  const type = useAppType();
  const { user } = useSelector(userSelector);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  const [isFavoriteMoviesLoading, setIsFavoriteMoviesLoading] = useState(true);
  const [isWatchlistMoviesLoading, setIsWatchlistMoviesLoading] =
    useState(true);

  async function addToFavorite() {
    if (isFavoriteMoviesLoading) return;

    setIsFavoriteMoviesLoading(true);

    try {
      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&session_id=${localStorage.getItem("session_id")}`,
        {
          media_type: type,
          media_id: data?.id,
          favorite: !isMovieFavorited,
        }
      );
      setIsMovieFavorited((prev) => !prev);
      if (!isMovieFavorited) {
        toast.success("Movie successfully added to favorites !");
      } else {
        toast.error("Movie removed from favorites !");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Sorry, an error has occurred. if you are not logged in, please first login !"
      );
    }

    setIsFavoriteMoviesLoading(false);
  }

  async function addToWatchList() {
    if (isWatchlistMoviesLoading) return;

    setIsWatchlistMoviesLoading(true);

    try {
      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&session_id=${localStorage.getItem("session_id")}`,
        {
          media_type: type,
          media_id: data?.id,
          watchlist: !isMovieWatchListed,
        }
      );
      setIsMovieWatchListed((prev) => !prev);
      if (!isMovieWatchListed) {
        toast.success("Movie successfully added to watchlist !");
      } else {
        toast.error("Movie removed from watchlist !");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Sorry, an error has occurred. if you are not logged in, please first login !"
      );
    }

    setIsWatchlistMoviesLoading(false);
  }

  useEffect(() => {
    if (!user) return;

    (async () => {
      setIsFavoriteMoviesLoading(true);
      setIsWatchlistMoviesLoading(true);

      const [isFavorite, isWatchlisted] = await Promise.all([
        getMovieDefaultState(data?.id, "favorite", user.id, type),
        getMovieDefaultState(data?.id, "watchlist", user.id, type),
      ]);

      setIsMovieFavorited(isFavorite);
      setIsMovieWatchListed(isWatchlisted);

      setIsFavoriteMoviesLoading(false);
      setIsWatchlistMoviesLoading(false);
    })();
  }, [data, user, type]);

  return {
    isFavoriteMoviesLoading,
    isWatchlistMoviesLoading,
    isMovieFavorited,
    isMovieWatchListed,
    addToFavorite,
    addToWatchList,
  };
};
