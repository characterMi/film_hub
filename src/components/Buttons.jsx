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
import {
  Box,
  Button,
  ButtonGroup as ButtonGroupFromMUI,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAddMovieToPlaylist } from "../hooks/useAddMovieToPlaylist";

const ButtonGroup = ({ children, theme }) => {
  const isMobile = useMediaQuery("(width < 400px)");

  return (
    <ButtonGroupFromMUI
      color={theme.palette.mode === "light" ? "primary" : "error"}
      size="medium"
      variant="outlined"
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      {children}
    </ButtonGroupFromMUI>
  );
};

const Buttons = ({ data, theme, setOpenModal }) => {
  return (
    <>
      <Grid item container mt="2rem">
        <Box className="buttons-container">
          <Grid item>
            <ButtonGroup theme={theme}>
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
                disabled={!data?.imdb_id}
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
            <ButtonGroup theme={theme}>
              <PlaylistButtons data={data} />
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
};

const PlaylistButtons = ({ data }) => {
  const {
    isFavoriteMoviesLoading,
    isWatchlistMoviesLoading,
    addToFavorite,
    addToWatchList,
    isMovieFavorited,
    isMovieWatchListed,
  } = useAddMovieToPlaylist(data);

  return (
    <>
      <Button
        onClick={addToFavorite}
        endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}
        disabled={isFavoriteMoviesLoading}
      >
        Favorite
      </Button>

      <Button
        onClick={addToWatchList}
        endIcon={
          isMovieWatchListed ? <RemoveCircleOutline /> : <AddCircleOutline />
        }
        disabled={isWatchlistMoviesLoading}
      >
        Watchlist
      </Button>
    </>
  );
};

export default Buttons;
