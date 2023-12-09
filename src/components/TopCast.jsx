import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopCast = ({ data, theme }) => {
  const [actorsNumber, setActorsNumber] = useState(6);
  return (
    <>
      <Typography variant="h4" mb={3}>
        Top Cast :
      </Typography>
      <Grid
        item
        container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data &&
          data?.credits?.cast
            ?.map((character, i) => (
              <Grid
                key={i}
                item
                component={Link}
                to={`/actors/${character?.id}`}
                sx={{
                  textDecoration: "none",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  width: "160px",
                }}
                mb={3}
              >
                <Box
                  component="img"
                  src={
                    character?.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${character?.profile_path}`
                      : "https://dummyimage.com/500x750"
                  }
                  alt={character?.name}
                  sx={{
                    width: "100%",
                    maxWidth: "7em",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <Tooltip disableTouchListener arrow title={character?.name}>
                  <Typography
                    color="textPrimary"
                    sx={{
                      textOverflow: "ellipsis",
                      width: "160px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {character?.name}
                  </Typography>
                </Tooltip>
                <Tooltip
                  disableTouchListener
                  arrow
                  title={character?.character?.split("/")[0]}
                >
                  <Typography
                    color="textSecondary"
                    sx={{
                      textOverflow: "ellipsis",
                      width: "160px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {character?.character?.split("/")[0]}
                  </Typography>
                </Tooltip>
              </Grid>
            ))
            .slice(0, actorsNumber)}
      </Grid>
      {data?.credits?.cast?.length > actorsNumber ? (
        <Button
          color={theme.palette.mode === "light" ? "primary" : "error"}
          variant="contained"
          sx={{ m: "20px auto 0" }}
          onClick={() => setActorsNumber((prev) => prev + 6)}
        >
          Load more
        </Button>
      ) : null}
    </>
  );
};

export default TopCast;
