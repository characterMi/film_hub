import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MainPoster = ({ movie }) => (
  <Link
    style={{
      position: "relative",
      width: "100%",
      borderRadius: "10px",
      height: "500px",
      textDecoration: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden",
      color: "#fff",
    }}
    to={`/movie/${movie?.id}`}
  >
    <Box
      sx={{
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.575)",
        backgroundBlendMode: "darken",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    />
    <Box sx={{ p: { xs: 2, sm: 4 } }} zIndex="2">
      <Typography
        variant="h4"
        mb="1rem"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontWeight: "bold"
        }}
      >
        {movie?.title}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8 }}>
        {movie?.overview?.length > 500
          ? `${movie?.overview?.slice(0, 500)}...`
          : movie?.overview}
      </Typography>
    </Box>
  </Link>
);

export default MainPoster;
