import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetMoviesQuery } from '../services/TMDB'
import { Error, Loader, MainPoster, MovieList, PaginationComponent } from '.'

const Movies = ({ theme }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page: currentPage, searchQuery })

  // Set the page to 1 if user changed the category or genre
  
  useEffect(() => {
    setCurrentPage(1)
  }, [genreIdOrCategoryName, searchQuery])
  
  if (isFetching) {
    return (
      <Loader theme={theme} size="4rem" />
    )
  } else if (error) {
    return (
      <Error text="An error has occurred." />
    )
  } else if (!data?.results?.length) {
    return (
      <Error text={<>no movies that match that name.<br />Please search for something else.</>} />
    )
  } 
  return (
    <div>
      <MainPoster movie={data?.results[0]} />
      <MovieList movies={data} theme={theme} />
      <PaginationComponent movies={data} page={currentPage} setCurrentPage={setCurrentPage} theme={theme} />
    </div>
  )
}

export default Movies