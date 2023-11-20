import { useParams } from 'react-router-dom'
import { useGetMovieQuery, useGetRecommendationsQuery } from '../services/TMDB';
import { Grid } from '@mui/material';
import { Error, Loader, MovieDetails, RecommendedAndActorMovies, Trailer } from '../components';
import { useState } from 'react';

const MovieInformation = ({ theme }) => {
  const [openModal, setOpenModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id)
  const { data: recommendations, isFetching: isRecommendationsFetching, error: recommendationsError } = useGetRecommendationsQuery({ movieId: id, page: currentPage, list: 'recommendations' })
// console.log(data);
  if (isFetching) {
    return (
      <Loader theme={theme} size="8rem" />
    )
  } else if (error) {
    return (
      <Error backButton theme={theme} text="Something has gone wrong" />
    )
  }
  
  return (
    <Grid container className='container-space-around'>
      {/* All movie information like the poster, name, actors and ... */}
      <MovieDetails data={data} setOpenModal={setOpenModal} id={id} theme={theme} />
      {/* Recommended movies */}
      <RecommendedAndActorMovies theme={theme} data={recommendations} text="You might also like" loading={isRecommendationsFetching} error={recommendationsError} page={currentPage} setCurrentPage={setCurrentPage} />
      {/* Trailer */}
      <Trailer data={data} openModal={openModal} setOpenModal={setOpenModal} />
    </Grid>
  )
}

export default MovieInformation