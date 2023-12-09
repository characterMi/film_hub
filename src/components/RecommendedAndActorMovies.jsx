import { Box, Typography } from "@mui/material";
import { Error, Loader, MovieList, PaginationComponent } from ".";

const RecommendedAndActorMovies = ({
  theme,
  data,
  text,
  loading,
  error,
  page,
  setCurrentPage,
}) => {
  if (loading) {
    return <Loader theme={theme} size="8rem" />;
  } else if (error) {
    return <Error backButton text="Oops ! No results" />;
  }
  return (
    <Box mt="5rem" width="100%">
      <Typography variant="h3" align="center" gutterBottom mt={3}>
        {text}
      </Typography>
      {data?.results?.length > 0 ? (
        <>
          <MovieList movies={data} theme={theme} />
          <PaginationComponent
            theme={theme}
            movies={data}
            page={page}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Typography
          color={theme.palette.mode === "light" ? "primary.main" : "error.main"}
          mt={5}
          align="center"
          variant="h5"
        >
          Sorry, nothing was found.
        </Typography>
      )}
    </Box>
  );
};

export default RecommendedAndActorMovies;
