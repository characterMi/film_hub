import {
  AddCircleOutline,
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie,
  RemoveCircleOutline,
  Theaters,
} from "@mui/icons-material";
import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";

const Buttons = ({
  data,
  theme,
  setOpenModal,
  isMovieFavorited,
  isMovieWatchListed,
  addToFavorite,
  addToWatchList,
}) => (
  <>
    <Grid item container mt="2rem">
      <Box className="buttons-container">
        <Grid item>
          <ButtonGroup
            color={theme.palette.mode === "light" ? "primary" : "error"}
            size="medium"
            variant="outlined"
          >
            <Button
              endIcon={<Language />}
              href={data?.homepage}
              target="_blank"
              rel="noreferrer noopener"
            >
              Website
            </Button>
            <Button
              endIcon={<Movie />}
              href={`https://www.imdb.com/title/${data?.imdb_id}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              IMDB
            </Button>

            {/* Open the trailer Modal */}

            <Button onClick={() => setOpenModal(true)} endIcon={<Theaters />}>
              Trailer
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup
            color={theme.palette.mode === "light" ? "primary" : "error"}
            size="medium"
            variant="outlined"
          >
            <Button
              onClick={addToFavorite}
              endIcon={
                isMovieFavorited ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorderOutlined color="error" />
                )
              }
            >
              Favorite
            </Button>
            <Button
              onClick={addToWatchList}
              endIcon={
                isMovieWatchListed ? (
                  <RemoveCircleOutline />
                ) : (
                  <AddCircleOutline />
                )
              }
            >
              Watchlist
            </Button>
            <Button
              endIcon={<ArrowBack />}
              onClick={() => window.history.back()}
            >
              <Typography
                color="inherit"
                sx={{ textDecoration: "none" }}
                variant="subtitle2"
              >
                back
              </Typography>
            </Button>
          </ButtonGroup>
        </Grid>
      </Box>
    </Grid>
  </>
);

export default Buttons;
