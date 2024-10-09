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

  console.log(data);


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
        data={recommendations}
        text="You might also like"
        loading={isRecommendationsFetching}
        error={recommendationsError}
        page={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Trailer */}
      <Trailer data={data} openModal={openModal} setOpenModal={setOpenModal} />
    </Grid>
  );
};

export default MoviePage;
