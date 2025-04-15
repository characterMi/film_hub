import { Box, Typography } from "@mui/material";
import { Loader, MovieList, Pagination } from ".";

const RecommendedAndActorMovies = ({
  theme,
  data,
  title,
  loading,
  error,
  currentPage,
  setCurrentPage,
  numberOfPages,
}) => {
  if (loading) return <Loader size="8rem" />;

  if (error || data.length < 1) return null;

  return (
    <Box mt="5rem" width="100%">
      <Typography variant="h3" align="center" gutterBottom mt={3}>
        {title}
      </Typography>
      <MovieList movies={data} theme={theme} />
      <Pagination
        theme={theme}
        numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default RecommendedAndActorMovies;
