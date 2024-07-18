import { Box, Typography } from "@mui/material";
import { MovieList } from ".";

const RatedCards = ({ theme, title, data }) => (
  <Box>
    <Typography variant="h4" gutterBottom>− {title}</Typography>

    <MovieList movies={data} theme={theme} isProfilePage />
  </Box>
);

export default RatedCards;
