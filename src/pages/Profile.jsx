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

  // Update lists, immediately after user added them to the lists

  useEffect(() => {
    favoriteRefetch();
    watchlistRefetch();
  }, []);

  // Check if there's an error

  if (isFavoriteMoviesFetching || isWatchListMoviesFetching) {
    return <Loader size="6rem" />;
  }

  if (favoriteMoviesError || watchListMoviesError) {
    return <Error backButton theme={theme} text="Something went wrong !" />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              border: "1px solid",
              p: 1,
              width: { xs: "45px", sm: "60px" },
              height: { xs: "45px", sm: "60px" },
            }}
            alt={user?.username}
            src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`}
          />
          <Box display="flex" flexDirection="column" ml="1rem">
            <Typography
              sx={{ fontSize: { xs: "26px", sm: "34px" } }}
              gutterBottom
            >
              My Profile
            </Typography>
            <Typography variant="body1" color="#7a7a7a">
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
      <Box>
        {!watchListMovies?.results?.length ? (
          <Typography variant="h5">
            Watchlist some movies to see them here!
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
