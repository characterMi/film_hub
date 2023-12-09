import axios from "axios";
import { Grid, Box, Typography } from "@mui/material";
import { Buttons, TopCast, MovieDetail, Poster } from ".";
import { useSelector } from "react-redux";
import { userSelector } from "../features/auth";
import { useGetListQuery } from "../services/TMDB";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import BG_DARK from "../assets/backgrounds/bg_01_red.png";
import BG_LIGHT from "../assets/backgrounds/bg_01_blue.png";

const MovieInformation = ({ data, setOpenModal, id, theme }) => {
  const { user } = useSelector(userSelector);
  const {
    data: favoriteMovies,
    error: favoriteMoviesError,
    refetch: favoriteRefetch,
  } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const {
    data: watchListMovies,
    error: watchListMoviesError,
    refetch: watchlistRefetch,
  } = useGetListQuery({
    listName: "watchlist/movies",
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
          media_type: "movie",
          media_id: id,
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
    }
    if (favoriteMoviesError) {
      toast.error(
        "Sorry, an error has occurred. if you are not logged in, please first login !"
      );
    }
  };
  const addToWatchList = async () => {
    try {
      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&session_id=${localStorage.getItem("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
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
    }
    if (watchListMoviesError) {
      toast.error(
        "Sorry, an error has occurred. if you are not logged in, please first login !"
      );
    }
  };

  // Check if the user already add the movie to watchlist or favorites

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchListMovies?.results?.find((movie) => movie.id === data?.id)
    );
  }, [watchListMovies, data]);

  // ReFetch

  useEffect(() => {
    favoriteRefetch();
    watchlistRefetch();
  }, []);

  return (
    <>
      {/* Movie Poster */}
      <Grid
        sx={{ position: "relative" }}
        item
        xs={12}
        sm={data?.poster_path ? 6 : 0}
        md={data?.poster_path ? 5 : 0}
      >
        <Box
          component="img"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: { xs: "100vw", md: "calc(100vw - 240px)" },
            height: "107%",
            zIndex: "-1",
            mx: { xs: "-0.3rem", sm: "-1rem" },
            my: "-1.6rem",
            maxWidth: "1360px",
          }}
          alt="background"
          src={theme.palette.mode === "light" ? BG_LIGHT : BG_DARK}
        />
        <Poster w="w500" path={data?.poster_path} title={data?.title} />
      </Grid>
      {/* Movie Details */}
      <Grid
        item
        container
        direction="column"
        xs={12}
        sm={data?.poster_path ? 6 : 12}
        md={data?.poster_path ? 7 : 12}
        sx={{
          px: { xs: 0, sm: 2, lg: 5 },
          mt: { xs: 4, sm: 0 },
          backdropFilter: { xs: "none", sm: "blur(3px)" },
          borderRadius: "0 20px 20px 0",
        }}
      >
        <MovieDetail data={data} theme={theme} />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>
        <Typography mb="2rem" align="center">
          {data?.overview}
        </Typography>
      </Grid>
      {/* TopCast and Action Buttons: Website, IMDB, Trailer, Add to Favorite, Add to watchlist, Back to previous page */}
      <Grid item container xs={12} mt={5}>
        <TopCast data={data} theme={theme} />
        <Buttons
          data={data}
          theme={theme}
          setOpenModal={setOpenModal}
          isMovieFavorited={isMovieFavorited}
          isMovieWatchListed={isMovieWatchListed}
          addToFavorite={addToFavorite}
          addToWatchList={addToWatchList}
        />
      </Grid>
    </>
  );
};

export default MovieInformation;
