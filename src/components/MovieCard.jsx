import {
  Box,
  Grid,
  Grow,
  Rating,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, i, theme }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid item p="10px">
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Box
          component={Link}
          to={`/movie/${movie?.id}`}
          sx={{
            fontWeight: "bolder",
            textDecoration: "none",
            display: "flex",
            width: { xs: "calc(100vw - 2em)", sm: "250px", lg: "300px" },
            borderRadius: "10px",
            flexDirection: "column",
            alignItems: "center",
            px: { xs: 2, sm: 1 },
            background: theme.palette.mode === "light" ? "#ececec" : "#1a1a1a",
            mt: "3rem",
            height: { xs: "auto", sm: "570px", lg: "630px" },
            "&:hover img": { transform: "scale(1.05)" },
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              transition: "all 100ms ease",
              mt: "-20px",
              borderRadius: "10px 10px 0 0",
            }}
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                : "https://dummyimage.com/200x300"
            }
            alt={movie?.title}
          />
          <Box
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <Typography
              color={theme.palette.mode === "light" ? "#000" : "#fff"}
              sx={{
                textOverflow: "ellipsis",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: { xs: "20px", lg: "28px" },
              }}
            >
              {movie?.title}
            </Typography>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mt="1rem"
            >
              <Tooltip
                arrow
                disableTouchListener
                title={`${Math.ceil(movie?.vote_average * 10) / 10} / 10`}
              >
                <div>
                  <Rating
                    size={isMobile ? "medium" : "small"}
                    readOnly
                    value={Math.ceil(movie?.vote_average * 10) / 20}
                    precision={0.1}
                  />
                </div>
              </Tooltip>
              <Typography
                color={theme.palette.mode === "light" ? "#000" : "#fff"}
                sx={{ fontSize: { xs: "18px", sm: "14px" } }}
              >
                Language: {movie?.original_language?.toUpperCase()}
              </Typography>
            </Box>
            <Typography
              color={theme.palette.mode === "light" ? "#000" : "#fff"}
              sx={{ fontSize: "14px", my: "1rem" }}
            >
              {!isMobile && movie?.overview?.length > 200
                ? `${movie?.overview?.slice(0, 200)}...`
                : movie?.overview}
            </Typography>
          </Box>
        </Box>
      </Grow>
    </Grid>
  );
};

export default MovieCard;
