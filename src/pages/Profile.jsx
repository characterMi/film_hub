import { ExitToApp } from "@mui/icons-material";
import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertBox, UserMovies } from "../components";
import { userSelector } from "../features/auth";
import { useGetListQuery } from "../services/TMDB";
import { a11yProps } from "../utils";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

const Profile = ({ theme }) => {
  let type = "movies";
  const sessionId = localStorage.getItem("session_id");
  const navigate = useNavigate();

  if (localStorage.getItem("type") === "tv") {
    type = "tv";
  }

  if (!sessionId) {
    toast.error("You need to login to view your profile!");
    navigate("/");
  }

  const { user } = useSelector(userSelector);
  const {
    data: favoriteMovies,
    isFetching: isFavoriteMoviesFetching,
    error: favoriteMoviesError,
    refetch: favoriteRefetch,
  } = useGetListQuery({
    listName: `favorite/${type}`,
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
    listName: `watchlist/${type}`,
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const tabIndex = searchParams.get("tab");
  const [alertBox, setAlertBox] = useState(false);
  const [value, setValue] = useState(tabIndex || 0);

  useEffect(() => {
    if (tabIndex >= 0 && tabIndex <= 1) {
      setValue(+tabIndex);
    } else {
      setValue(0);
    }
  }, [tabIndex]);

  // Update lists, immediately after user added a movie to the lists
  useEffect(() => {
    const { unsubscribe: unsubscribeWatchlist } = watchlistRefetch();
    const { unsubscribe: unsubscribeFavorites } = favoriteRefetch();

    return () => {
      unsubscribeWatchlist();
      unsubscribeFavorites();
    }
  }, []);

  const handleTabChange = (_, newValue) => {
    setSearchParams({ tab: newValue });
    setValue(newValue);
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
          value={value}
          onChange={handleTabChange}
          aria-label="Movie tabs"
          textColor="inherit"
        >
          <Tab label="Favorites" {...a11yProps(0)} />
          <Tab label="Watchlist" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserMovies
          theme={theme}
          movies={favoriteMovies}
          fallbackText="Add some favorite movies to see them here!"
          title="Favorite Movies"
          isLoading={isFavoriteMoviesFetching}
          isError={favoriteMoviesError}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserMovies
          theme={theme}
          movies={watchListMovies}
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
