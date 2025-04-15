import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Poster from "./Poster";

const TopCast = ({ data, theme }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const actorsCount = Number(searchParams.get("actors_count"));
  const [actorsNumber, setActorsNumber] = useState(actorsCount || 6);

  useEffect(() => {
    if (actorsCount) {
      setActorsNumber(actorsCount)
    } else {
      setActorsNumber(6);
    }
  }, [actorsCount]);

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("actors_count", actorsCount ? actorsCount + 6 : 12);

    setSearchParams(newParams);
  }

  if (data.length < 1) return null;

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
          gap: "24px",
        }}
      >
        {data.map((character, i) => (
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
              maxWidth: "7em",
              gap: "10px"
            }}
            mb={3}
          >
            <Poster path={character?.profile_path} title={character?.name} w="w500" type="card" />

            <Tooltip disableTouchListener arrow title={character?.name}>
              <Typography
                color="textPrimary"
                sx={{
                  textOverflow: "ellipsis",
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  fontWeight: "bold"
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
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  opacity: .8
                }}
              >
                {character?.character?.split("/")[0]}
              </Typography>
            </Tooltip>
          </Grid>
        ))
          .slice(0, actorsNumber)}
      </Grid>
      {
        data.length > actorsNumber
          ? (
            <Button
              color={theme.palette.mode === "light" ? "primary" : "error"}
              variant="contained"
              sx={{ m: "20px auto 0" }}
              onClick={handleClick}
            >
              Load more
            </Button>
          )
          : null
      }
    </>
  );
};

export default TopCast;
