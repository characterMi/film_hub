import { Grid } from "@mui/material";
import { MovieCard } from ".";

const MovieList = ({ movies, theme }) => (
  <Grid
    container
    sx={{
      // display: "flex",
      // flexWrap: "wrap",
      // justifyContent: "center",
      // overflowY: "auto",
      overflowX: "hidden",
    }}
  >
    {movies?.results?.map((movie, index) =>
      index === 0 ? null : (
        <MovieCard key={index} movie={movie} i={index} theme={theme} />
      )
    )}
  </Grid>
);

export default MovieList;
