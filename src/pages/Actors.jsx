import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  ActorDetails,
  Error,
  Loader,
  RecommendedAndActorMovies,
} from "../components";
import { usePagination } from "../hooks/usePagination";
import {
  useGetActorDetailQuery,
  useGetActorMoviesQuery,
} from "../services/TMDB";

const Actors = ({ theme }) => {
  const [currentPage, setCurrentPage] = usePagination();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const {
    data: moviesData,
    isFetching: isMoviesFetching,
    error: moviesError,
  } = useGetActorMoviesQuery({ id, page: currentPage });

  if (isFetching) {
    return <Loader size="8rem" />;
  }

  if (error) {
    return <Error backButton theme={theme} text="Something has gone wrong" />;
  }

  return (
    <>
      <Grid container className="container-space-around">
        {/* Actor's Detail, such as the image, biography and ... */}
        <ActorDetails data={data} theme={theme} />
        {/* Actor's Movies */}
        <RecommendedAndActorMovies
          theme={theme}
          data={moviesData}
          text="Movies"
          loading={isMoviesFetching}
          error={moviesError}
          page={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </>
  );
};

export default Actors;
