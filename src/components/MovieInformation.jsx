import { Box, Grid } from "@mui/material";
import { Buttons, MovieDetail, Poster, TopCast } from ".";
import { useMovieInformation } from "../hooks/useMovieInformation";

import BG_LIGHT from "../assets/backgrounds/bg_01_blue.png";
import BG_DARK from "../assets/backgrounds/bg_01_red.png";

const MovieInformation = ({ data, setOpenModal, id, theme }) => {
  const { addToFavorite, addToWatchList, isMovieFavorited, isMovieWatchListed } = useMovieInformation(data);

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
            mx: { xs: "-1rem", sm: "-1rem" },
            my: "-1.6rem",
            maxWidth: "1360px",
          }}
          alt="background"
          src={theme.palette.mode === "light" ? BG_LIGHT : BG_DARK}
        />
        <Poster w="w500" path={data?.poster_path} title={data?.title ?? data?.name ?? "Movie Poster"} />
      </Grid>

      <MovieDetail data={data} theme={theme} />
      {/* TopCast and Action Buttons: Website, IMDB, Trailer, Add to Favorite, Add to watchlist, Back to previous page */}
      <Grid item container xs={12} mt={5}>
        <TopCast data={data?.credits?.cast ?? []} theme={theme} />
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
