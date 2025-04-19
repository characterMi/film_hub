import { Box, Grid, Rating, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import genreIcons from "../assets/genres";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { useMovieDetail } from "../hooks/useMovieDetail";

const MovieDetail = ({ data, theme }) => {
  const dispatch = useDispatch();
  const { firstRowContent, secondRowContent } = useMovieDetail(data);

  return (
    <>
      <Grid
        item
        container
        direction="column"
        xs={12}
        sm={data?.poster_path ? 6 : 12}
        md={data?.poster_path ? 7 : 12}
        sx={{
          px: { xs: 0, sm: 2, lg: 5 },
          mt: { xs: 4, sm: 0 },
          backdropFilter: { xs: "none", sm: "blur(3px)" },
          borderRadius: "0 20px 20px 0",
        }}
      >
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
          {data?.title ?? data?.name ?? "(Unknown)"}{" "}
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
            {firstRowContent[0]}
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
          {secondRowContent.map(item => (
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
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
        mx="auto"
      >
        {data?.overview
          ? (
            <>
              <Typography variant="h4" gutterBottom>
                Overview
              </Typography>
              <Typography mb="2rem" align="justify">
                {data.overview}
              </Typography>
            </>
          )
          : null
        }
      </Grid>
    </>
  );
};

export default MovieDetail;
