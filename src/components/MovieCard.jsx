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
import Poster from "./Poster";

const MovieCard = ({ movie, i, theme }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid item px="10px" xs={12} sm={6} mdl={4} lgl={3} mt="2rem">
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Box
          component={Link}
          to={`/movie/${movie?.id}`}
          sx={{
            fontWeight: "bolder",
            textDecoration: "none",
            display: "flex",
            width: "100%",
            borderRadius: "10px",
            flexDirection: "column",
            alignItems: "center",
            px: { xs: 2, sm: 1 },
            background: theme.palette.mode === "light" ? "#ececec" : "#1a1a1a",
            height: "100%",
            "&:hover img": { transform: "scale(1.05)" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              mt: "-20px",
            }}
          >
            <Poster
              path={movie?.poster_path}
              title={movie?.title}
              w="w500"
              type="card"
            />
          </Box>
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
                fontSize: { xs: "24px", lg: "28px" },
                fontWeight: "600"
              }}
            >
              {movie?.title || "No title"}
            </Typography>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mt="1rem"
              flexWrap="wrap"
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
            <Box sx={{ marginBlock: "1rem" }}>
              <Typography
                color={theme.palette.mode === "light" ? "#000" : "#fff"}
                className="movie-card__description"
              >
                {movie?.overview || "No description..."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grow>
    </Grid>
  );
};

export default MovieCard;
