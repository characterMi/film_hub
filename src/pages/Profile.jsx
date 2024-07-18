import { ExitToApp } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AlertBox, Error, Loader, RatedCards } from "../components";
import { userSelector } from "../features/auth";
import { useGetListQuery } from "../services/TMDB";

const Profile = ({ theme }) => {
  const { user } = useSelector(userSelector);
  const {
    data: favoriteMovies,
    isFetching: isFavoriteMoviesFetching,
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
    isFetching: isWatchListMoviesFetching,
    error: watchListMoviesError,
    refetch: watchlistRefetch,
  } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const [alertBox, setAlertBox] = useState(false);

  // Update lists, immediately after user added a movie to the lists
  useEffect(() => {
    favoriteRefetch();
    watchlistRefetch();
  }, []);

  if (isFavoriteMoviesFetching || isWatchListMoviesFetching) {
    return <Loader size="6rem" />;
  }

  if (favoriteMoviesError || watchListMoviesError) {
    return <Error backButton theme={theme} text="Something went wrong !" />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="1rem">
        <Box display="flex" overflow="hidden" flex="1" minWidth="200px">
          <Avatar
            sx={{
              border: "1px solid",
              p: 1,
              width: { xs: "45px", sm: "60px" },
              height: { xs: "45px", sm: "60px" },
            }}
            mb="-1rem"
            alt={user?.username}
            src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`}
          />
          <Box display="flex" flexDirection="column" ml="1rem">
            <Typography
              sx={{ fontSize: { xs: "26px", sm: "34px" } }}
              gutterBottom
            >
              Your Profile
            </Typography>
            <Typography
              variant="body1"
              color="#7a7a7a"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%"
              }}
            >
              @{user?.username}
            </Typography>
          </Box>
        </Box>
        <Button
          size="small"
          sx={{ height: "max-content" }}
          color={theme.palette.mode === "light" ? "primary" : "error"}
          variant="outlined"
          onClick={() => setAlertBox(true)}
        >
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      <Box mb="4rem" mt="4rem">
        {!favoriteMovies?.results?.length ? (
          <Typography variant="h5">
            Add some favorite movies to see them here!
          </Typography>
        ) : (
          <Box>
            <RatedCards
              theme={theme}
              title="Favorite Movies"
              data={favoriteMovies}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          borderTop: "1px solid",
          pt: "2rem",
          borderColor: theme.palette.mode === "light" ? "#000000" : "#ffffff"
        }}
      >
        {!watchListMovies?.results?.length ? (
          <Typography variant="h5">
            Add some movies to "watchlist" and you'll see them here!
          </Typography>
        ) : (
          <Box>
            <RatedCards
              theme={theme}
              title="Watchlist"
              data={watchListMovies}
            />
          </Box>
        )}
      </Box>
      <AlertBox setAlertBox={setAlertBox} alertBox={alertBox} theme={theme} />
    </Box>
  );
};

export default Profile;
