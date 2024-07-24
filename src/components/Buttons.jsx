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
  useMediaQuery
} from "@mui/material";

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
  )
}

const Buttons = ({
  data,
  theme,
  setOpenModal,
  isMovieFavorited,
  isMovieWatchListed,
  addToFavorite,
  addToWatchList,
}) => {
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
}

export default Buttons;
