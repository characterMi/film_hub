import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ActorDetails, Error, Loader, MovieList } from "../components";
import { useAppType } from "../hooks/useAppType";
import {
  useGetActorCreditsQuery,
  useGetActorDetailQuery,
} from "../services/TMDB";

const Actors = ({ theme }) => {
  const type = useAppType();

  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const { data: credits, isFetching: creditsLoading } =
    useGetActorCreditsQuery(id);

  if (isFetching) {
    return <Loader size="8rem" />;
  }

  if (error) {
    return <Error backButton theme={theme} text="Something has gone wrong" />;
  }

  return (
    <>
      <Grid container className="container-space-around">
        <ActorDetails data={data} theme={theme} />

        {creditsLoading ? (
          <Loader size="8rem" />
        ) : (
          <>
            <Typography variant="h3" align="center" gutterBottom mt={"5rem"}>
              {type === "tv" ? "TV Shows" : "Movies"}
            </Typography>

            <MovieList
              movies={[...(credits?.cast || [])].sort(
                (a, b) => b.popularity - a.popularity
              )}
              theme={theme}
            />
          </>
        )}
      </Grid>
    </>
  );
};

export default Actors;
