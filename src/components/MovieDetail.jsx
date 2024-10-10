import { Box, Grid, Rating, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import genreIcons from "../assets/genres";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";

const MovieDetail = ({ data, theme }) => {
  const movieDetail = useRef({
    firstRowContent: [`Language: ${data?.original_language?.toUpperCase()} | `],
    secondRowContent: [`Status: ${data?.status}`],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const type = localStorage.getItem("type");

    if (type === "movie") {
      let duration = null;

      if (data?.runtime < 60) {
        duration = `${data?.runtime ?? 0}m`;
      } else {
        const minutes = data?.runtime % 60;
        const hours = (data?.runtime - minutes) / 60;
        duration = `${hours}h ${minutes}m`;
      }

      movieDetail.current.firstRowContent[0] += `Duration: ${duration}`;

      movieDetail.current.secondRowContent.push(`Budget: ${data?.budget?.toLocaleString() ?? 0}`);
      movieDetail.current.secondRowContent.push(`Revenue: ${data?.revenue?.toLocaleString() ?? 0}`);
    }

    if (type === "tv") {
      const lastSeasonYear = data?.last_air_date?.split("-")[0];

      movieDetail.current.firstRowContent[0] += `Last season in: ${lastSeasonYear ?? 2000}`;

      movieDetail.current.secondRowContent.push(`Seasons: ${data?.number_of_seasons ?? 1}`);
      movieDetail.current.secondRowContent.push(`Episodes: ${data?.number_of_episodes ?? 12}`);
    }
  }, []);

  return (
    <>
      <Typography
        sx={{
          fontSize: {
            xs: "38px",
            sm: "32px",
            md: "28px",
            lg: "46px",
            xl: "66px",
          },
        }}
        align="center"
        gutterBottom
      >
        {data?.title || data?.name}{" "}
        {data?.release_date ? `(${data?.release_date?.split("-")[0]})` : null}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: "24px",
            sm: "18px",
            md: "20px",
            lg: "26px",
            xl: "36px",
          },
        }}
        align="center"
        gutterBottom
      >
        {data?.tagline}
      </Typography>
      <Grid
        item
        className="container-space-around"
        sx={{ flexWrap: "wrap !important" }}
      >
        <Box display="flex" align="center">
          <Rating readOnly value={data?.vote_average / 2} precision={0.1} />
          <Typography variant="subtitle1" ml="10px" gutterBottom>
            {Math.ceil(data?.vote_average * 5) / 10} / 5
          </Typography>
        </Box>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ ml: "15px !important" }}
        >
          {movieDetail.current.firstRowContent[0]}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          m: "10px 0 !important",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {data?.genres?.map((genre, index) => {
          // handling specific cases...
          const genreNameArray = genre?.name?.split(" ");
          let src = genreNameArray?.[0];

          switch (src) {
            case "Sci-Fi":
              src = genreNameArray?.[2];
              break;
            case "Soap":
              src = "Drama";
              break;

            default:
              break;
          }

          return (
            <Box
              component={Link}
              key={index}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: "0.5rem 1rem", md: "0" },
                ml: "5px",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={genreIcons[src?.toLowerCase()]}
                alt={`${genre?.name} Genre`}
                sx={{
                  height: 30,
                  filter: theme.palette.mode === "dark" && "invert(1)",
                  mr: "10px",
                }}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Box>
          )
        })}
      </Grid>
      <Grid
        item
        className="container-space-around"
        sx={{
          flexWrap: "wrap",
        }}
      >
        {movieDetail.current.secondRowContent.map(item => (
          <Typography
            key={item}
            variant="h6"
            sx={{ mt: { xs: "20px", xl: "50px" } }}
            ml="10px"
          >
            {item}
          </Typography>
        ))}
      </Grid>
    </>
  );
};

export default MovieDetail;
