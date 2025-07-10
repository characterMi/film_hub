import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../features/auth";
import { useGetListQuery } from "../services/TMDB";
import { useAppType } from "./useAppType";

export const useMovieInformation = (data) => {
  const type = useAppType();
  const { user } = useSelector(userSelector);
  const {
    data: favoriteMovies,
    error: favoriteMoviesError,
    refetch: favoriteRefetch,
  } = useGetListQuery({
    listName: `favorite/${type === "tv" ? "tv" : "movies"}`,
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const {
    data: watchListMovies,
    error: watchListMoviesError,
    refetch: watchlistRefetch,
  } = useGetListQuery({
    listName: `watchlist/${type === "tv" ? "tv" : "movies"}`,
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  // We want to know if a movie is already in favorites or watchlists
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  // Post the favorite or watchlist movies to the tmdb's database
  const addToFavorite = async () => {
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

      if (favoriteMoviesError) {
        console.error(watchListMoviesError);
        toast.error(
          "Sorry, an error has occurred. if you are not logged in, please first login !"
        );
      }
    }
  };

  const addToWatchList = async () => {
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

      if (watchListMoviesError) {
        console.error(watchListMoviesError);
        toast.error(
          "Sorry, an error has occurred. if you are not logged in, please first login !"
        );
      }
    }
  };

  // Check if the user already add the movie to watchlist or favorites
  useEffect(() => {
    setIsMovieFavorited(
      favoriteMovies?.results?.some((movie) => movie.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      watchListMovies?.results?.some((movie) => movie.id === data?.id)
    );
  }, [watchListMovies, data]);

  useEffect(() => {
    const { unsubscribe: unsubscribeWatchlist } = watchlistRefetch();
    const { unsubscribe: unsubscribeFavorites } = favoriteRefetch();

    return () => {
      unsubscribeWatchlist();
      unsubscribeFavorites();
    };
  }, []);

  return {
    isMovieFavorited,
    isMovieWatchListed,
    addToFavorite,
    addToWatchList,
  };
};
