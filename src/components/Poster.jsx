import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useState } from "react";
import Loader from "./Loader";

const Poster = ({ w, path, title, type = "poster" }) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: 6 / 9,
        background: theme.palette.mode === "light" ? "#ececec" : "#1a1a1a",
        borderRadius: "10px",
        position: "relative",
        boxShadow: type === "poster" && "0 0 1em 5px #000",
        overflow: "hidden",
        display: type === "poster" && !path ? "none" : "block",
      }}
    >
      <Box
        component="img"
        src={
          path
            ? `https://image.tmdb.org/t/p/${w}/${path}`
            : "https://dummyimage.com/200x300"
        }
        alt={title || "Image"}
        sx={{
          boxShadow: type === "poster" && "0 0 1em 5px #000",
          width: "100%",
          mb: { xs: "30px", md: 0 },
          m: { xs: "0 auto", lg: 0 },
          opacity: isPosterLoaded ? 1 : 0,
          objectFit: "cover",
          transition: "transform 100ms ease, opacity 500ms ease-in-out",
        }}
        onLoad={() => setIsPosterLoaded(true)}
        onError={() => {
          console.error("Error Loading the Image!");
          setIsError(true);
          setIsPosterLoaded(true);
        }}
        loading="lazy"
      />

      {
        !isPosterLoaded && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)" }}>
            <Loader size={type === "poster" ? "6rem" : "2rem"} />
          </div>
        )
      }

      {
        isError && (
          <Box
            component="img"
            src={
              theme.palette.mode === "light"
                ? "https://placehold.co/500x750/ececec/black?text=Error%20while%20loading%20the%20image"
                : "https://placehold.co/500x750/1a1a1a/white?text=Error%20while%20loading%20the%20image"
            }
            alt="Error while loading"
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )
      }
    </Box>
  );
};

export default Poster;
