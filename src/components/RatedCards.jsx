import { Box, Typography } from "@mui/material";
import { MovieCard } from ".";

const RatedCards = ({ theme, title, data }) => (
  <Box>
    <Typography variant="h4" gutterBottom>{`{{ ${title} }}`}</Typography>
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      sx={{ justifyContent: { xs: "center", sm: "start" } }}
    >
      {data?.results?.map((movie, i) => (
        <MovieCard movie={movie} i={i} theme={theme} key={i} />
      ))}
    </Box>
  </Box>
);

export default RatedCards;
