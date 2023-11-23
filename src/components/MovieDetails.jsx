import axios from 'axios';
import { Grid } from '@mui/material';
import { Buttons, TopCast, Details, Poster } from ".";
import { useSelector } from 'react-redux';
import { userSelector } from '../features/auth';
import { useGetListQuery } from '../services/TMDB';
import { useEffect, useState } from 'react';

const MovieDetails = ({ data, setOpenModal, id, theme }) => {
    const { user } = useSelector(userSelector)
    const { data: favoriteMovies, error: favoriteMoviesError, refetch: favoriteRefetch } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
    const { data: watchListMovies, error: watchListMoviesError, refetch: watchlistRefetch } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })

    // We want to know if a movie is already in favorites or watchlists 

    const [isMovieFavorited, setIsMovieFavorited] = useState(false)
    const [isMovieWatchListed, setIsMovieWatchListed] = useState(false)


    // Post the favorite or watchlist movies to the tmdb's database

    const addToFavorite = async () => {
        try {
            await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
                media_type: 'movie',
                media_id: id,
                favorite: !isMovieFavorited
            })
            setIsMovieFavorited(prev => !prev)
        } catch (error) {
            console.log(error);
        }
        if (favoriteMoviesError) {
            alert('Sorry, an Error has been occurred. try again')
        }
    }
    const addToWatchList = async () => {
        try {
            await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
                media_type: 'movie',
                media_id: id,
                watchlist: !isMovieWatchListed
            })
            setIsMovieWatchListed(prev => !prev)
        } catch (error) {
            console.log(error);
        }
        if (watchListMoviesError) {
            alert('Sorry, an Error has been occurred. try again')
        }
    }


    // Check if the user already add the movie to watchlist or favorites

    useEffect(() => {
        setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie.id === data?.id))
    }, [favoriteMovies, data])


    useEffect(() => {
        setIsMovieWatchListed(!!watchListMovies?.results?.find((movie) => movie.id === data?.id))
    }, [watchListMovies, data])

    // ReFetch

    useEffect(() => {
        favoriteRefetch()
        watchlistRefetch()
    }, [])

    return (
        <>
            {/* Movie Poster */}
            <Grid item xs={12} sm={data?.poster_path ? 6 : 0} md={data?.poster_path ? 5 : 0} >
                <Poster w="w500" path={data?.poster_path} title={data?.title} theme={theme} />
            </Grid>
            {/* Movie Details */}
            <Grid item container direction="column" xs={12} sm={data?.poster_path ? 6 : 12} md={data?.poster_path ? 7 : 12} sx={{ px: { xs: 0, sm: 2, lg: 5 }, mt: { xs: 4, sm: 0 } }}>
                <Details data={data} theme={theme} />
            </Grid>
            {/* TopCast and Action Buttons: Website, IMDB, Trailer, Add to Favorite, Add to watchlist, Back to previous page */}
            <Grid item container xs={12} mt={5}>
                <TopCast data={data} theme={theme} />
                <Buttons data={data} theme={theme} setOpenModal={setOpenModal} isMovieFavorited={isMovieFavorited} isMovieWatchListed={isMovieWatchListed} addToFavorite={addToFavorite} addToWatchList={addToWatchList} />
            </Grid>
        </>
    )
}

export default MovieDetails