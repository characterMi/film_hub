import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../features/auth'
import { Box, Button, Typography } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { AlertBox, Error, Loader, RatedCards } from '../components'
import { useGetListQuery } from '../services/TMDB'

const Profile = ({ theme }) => {
  const { user } = useSelector(userSelector)
  const { data: favoriteMovies, isFetching: isFavoriteMoviesFetching, error: favoriteMoviesError, refetch: favoriteRefetch } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: watchListMovies, isFetching: isWatchListMoviesFetching, error: watchListMoviesError, refetch: watchlistRefetch } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const [alertBox, setAlertBox] = useState(false)

  // Update lists, immediately after user added them to the lists

  useEffect(() => {
    favoriteRefetch()
    watchlistRefetch()
  }, [])
  
  // Check if there's an error

  if (isFavoriteMoviesFetching || isWatchListMoviesFetching) {
    return (
      <Loader theme={theme} size="6rem" />
    )
  }

  if (favoriteMoviesError || watchListMoviesError) {
    return (
      <Error backButton theme={theme} text="Something went wrong, Check your connection !" />
    )
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button size="small" color={theme.palette.mode === 'light' ? "primary" : 'error'} variant="outlined" onClick={() => setAlertBox(true)}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      <Box mb="3rem" mt="3rem">
        {!favoriteMovies?.results?.length ? (
          <Typography variant='h5'>Add some favorite movies to see them here!</Typography>
        ) : (
          <Box>
            <RatedCards theme={theme} title="Favorite Movies" data={favoriteMovies} />
          </Box>
        )}
      </Box>
      <Box>
        {!watchListMovies?.results?.length ? (
          <Typography variant='h5'>Watchlist some movies to see them here!</Typography>
        ) : (
          <Box>
            <RatedCards theme={theme} title="Watchlist" data={watchListMovies} />
          </Box>
        )}
      </Box>
      {alertBox && <AlertBox setAlertBox={setAlertBox} alertBox={alertBox} theme={theme} />}
    </Box>
  )
}

export default Profile