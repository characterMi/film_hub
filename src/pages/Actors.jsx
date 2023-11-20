import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetActorDetailQuery, useGetActorMoviesQuery } from '../services/TMDB'
import { Grid } from '@mui/material'
import { ActorDetails, Error, Loader, RecommendedAndActorMovies } from '../components'

const Actors = ({ theme }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { id } = useParams()
  const { data, isFetching, error } = useGetActorDetailQuery(id)
  const { data: moviesData, isFetching: isMoviesFetching, error: moviesError } = useGetActorMoviesQuery({ id, page: currentPage })

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
    <>
      <Grid container className="container-space-around">
        {/* Actor's Detail, such as the image, biography and ... */}
        <ActorDetails data={data} theme={theme} />
        {/* Actor's Movies */}
        <RecommendedAndActorMovies theme={theme} data={moviesData} text="Movies" loading={isMoviesFetching} error={moviesError} page={currentPage} setCurrentPage={setCurrentPage} />
      </Grid>
    </>
  )
}

export default Actors