import { Grid } from "@mui/material";
import { MovieCard } from ".";

const MovieList = ({ movies, theme, isProfilePage }) => (
  <Grid
    container
    sx={{
      overflowX: "hidden",
    }}
  >
    {movies?.results?.map((movie, index) => {
      if (!isProfilePage) {
        return !index
          ? null
          : <MovieCard key={movie?.id} movie={movie} i={index} theme={theme} />
      }

      return <MovieCard key={movie?.id} movie={movie} i={index} theme={theme} />
    }
    )}
  </Grid>
);

export default MovieList;
