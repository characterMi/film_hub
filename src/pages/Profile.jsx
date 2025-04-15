import { ExitToApp } from "@mui/icons-material";
import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertBox, UserMovies } from "../components";
import { userSelector } from "../features/auth";
import { useAppType } from "../hooks/useAppType";
import { useGetListQuery } from "../services/TMDB";

const TabPanel = ({ children, value, index, ...props }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    {...props}
  >
    {children}
  </div>
);

const Profile = ({ theme }) => {
  const type = useAppType();
  const sessionId = localStorage.getItem("session_id");

  const { user } = useSelector(userSelector);
  const {
    data: favoriteMovies,
    isFetching: isFavoriteMoviesFetching,
    error: favoriteMoviesError,
    refetch: favoriteRefetch,
  } = useGetListQuery({
    listName: `favorite/${type === "tv" ? "tv" : "movies"}`,
    accountId: user.id,
    sessionId,
    page: 1,
  });
  const {
    data: watchListMovies,
    isFetching: isWatchListMoviesFetching,
    error: watchListMoviesError,
    refetch: watchlistRefetch,
  } = useGetListQuery({
    listName: `watchlist/${type === "tv" ? "tv" : "movies"}`,
    accountId: user.id,
    sessionId,
    page: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [alertBox, setAlertBox] = useState(false);
  const [tabIndex, setTabIndex] = useState(Number(searchParams.get("tab")) === 1 ? 1 : 0);

  // Update lists, immediately after user added a movie to the lists
  useEffect(() => {
    if (!sessionId) {
      toast.error("You need to login to view your profile!");
      return;
    }

    const { unsubscribe: unsubscribeWatchlist } = watchlistRefetch();
    const { unsubscribe: unsubscribeFavorites } = favoriteRefetch();

    return () => {
      unsubscribeWatchlist();
      unsubscribeFavorites();
    }
  }, []);

  const handleTabChange = (_, newValue) => {
    setSearchParams({ tab: newValue });
    setTabIndex(newValue);
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
              {user?.username ? `@${user.username}` : "User"}
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: "2rem" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Movie tabs"
          textColor="inherit"
        >
          <Tab label="Favorites" aria-controls="Favorites tabpanel" />
          <Tab label="Watchlist" aria-controls="Watchlist tabpanel" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <UserMovies
          theme={theme}
          movies={favoriteMovies?.results ?? []}
          fallbackText="Add some favorite movies to see them here!"
          title="Favorite Movies"
          isLoading={isFavoriteMoviesFetching}
          isError={favoriteMoviesError}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <UserMovies
          theme={theme}
          movies={watchListMovies?.results ?? []}
          fallbackText={`Add some movies to "watchlist" and you'll see them here!`}
          title="Watchlist Movies"
          isLoading={isWatchListMoviesFetching}
          isError={watchListMoviesError}
        />
      </TabPanel>

      <AlertBox setAlertBox={setAlertBox} alertBox={alertBox} theme={theme} />
    </Box>
  );
};

export default Profile;
