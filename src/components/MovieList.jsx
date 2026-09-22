import { Grid } from "@mui/material";
import { MovieCard } from ".";

const MovieList = ({ movies, theme, shouldRenderTheFirstItem }) => (
  <Grid
    container
    sx={{
      overflowX: "hidden",
      mt: "1rem",
    }}
    rowGap="2rem"
  >
    {movies.map((movie, index) => {
      if (!shouldRenderTheFirstItem) {
        return index === 0 ? null : (
          <MovieCard key={movie?.id} movie={movie} i={index} theme={theme} />
        );
      }

      return (
        <MovieCard key={movie?.id} movie={movie} i={index} theme={theme} />
      );
    })}
  </Grid>
);

export default MovieList;
