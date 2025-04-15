import { Grid } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Error,
  Loader,
  MovieInformation,
  RecommendedAndActorMovies,
  Trailer,
} from "../components";
import { usePagination } from "../hooks/usePagination";
import { useGetMovieQuery, useGetRecommendationsQuery } from "../services/TMDB";

const MoviePage = ({ theme }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = usePagination();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: recommendationsError,
  } = useGetRecommendationsQuery({
    movieId: id,
    page: currentPage,
    list: "recommendations",
  });

  if (isFetching) return <Loader size="8rem" />;

  if (error) return <Error backButton theme={theme} text="Something has gone wrong" />;

  return (
    <Grid container mt="10px">
      {/* All movie information like the poster, name, actors and ... */}
      <MovieInformation
        data={data}
        setOpenModal={setOpenModal}
        id={id}
        theme={theme}
      />
      {/* Recommended movies */}
      <RecommendedAndActorMovies
        theme={theme}
        data={recommendations?.results ?? []}
        title="You might also like"
        loading={isRecommendationsFetching}
        error={recommendationsError}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={recommendations?.total_pages ?? 0}
      />
      {/* Trailer */}
      <Trailer video={data?.videos?.results?.[0]} openModal={openModal} setOpenModal={setOpenModal} />
    </Grid>
  );
};

export default MoviePage;
