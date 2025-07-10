import { ExitToApp } from "@mui/icons-material";
import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AlertBox, UserMovies } from "../components";
import { userSelector } from "../features/auth";

const TabPanel = ({ children, value, index, ...props }) => (
  <div role="tabpanel" hidden={value !== index} {...props}>
    {children}
  </div>
);

const Profile = ({ theme }) => {
  const { user } = useSelector(userSelector);

  const [searchParams, setSearchParams] = useSearchParams();
  const [alertBox, setAlertBox] = useState(false);
  const [tabIndex, setTabIndex] = useState(
    Number(searchParams.get("tab")) === 1 ? 1 : 0
  );

  const handleTabChange = (_, newValue) => {
    setSearchParams({ tab: newValue });
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="1rem"
      >
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
                maxWidth: "100%",
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

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mt: "2rem",
          position: "sticky",
          top: { xs: "120px", sm: "80px" },
          background: theme.palette.mode === "light" ? "white" : "#121212",
          zIndex: 10,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Movie list tabs"
          textColor="inherit"
        >
          <Tab label="Favorites" aria-controls="Favorites tabpanel" />
          <Tab label="Watchlist" aria-controls="Watchlist tabpanel" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <UserMovies
          theme={theme}
          listName="favorite"
          userId={user.id}
          fallbackText="Add some favorite movies to see them here!"
          title="Favorite Movies"
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <UserMovies
          theme={theme}
          listName="watchlist"
          userId={user.id}
          fallbackText={`Add some movies to "watchlist" and you'll see them here!`}
          title="Watchlist Movies"
        />
      </TabPanel>

      <AlertBox setAlertBox={setAlertBox} alertBox={alertBox} theme={theme} />
    </Box>
  );
};

export default Profile;
