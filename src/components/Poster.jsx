import { Box } from "@mui/material";

const Poster = ({ w, path, title }) => (
  <Box
    component="img"
    src={`https://image.tmdb.org/t/p/${w}/${path}`}
    alt={title}
    sx={{
      borderRadius: "10px",
      boxShadow: "0 0 1em 5px #000",
      width: "100%",
      mb: { xs: "30px", md: 0 },
      m: { xs: "0 auto", lg: 0 },
      display: path ? "block" : "none",
      objectFit: "cover",
    }}
  />
);

export default Poster;
