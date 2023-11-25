import axios from 'axios';
import { Grid, Box } from '@mui/material';
import { Buttons, TopCast, Details, Poster } from ".";
import { useSelector } from 'react-redux';
import { userSelector } from '../features/auth';
import { useGetListQuery } from '../services/TMDB';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import BG_RED from "../assets/backgrounds/bg_03_red.png"
import BG_BLUE from "../assets/backgrounds/bg_03_blue.png"

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
            if (!isMovieFavorited) {
                toast.success("Movie successfully added to favorites !")
            } else {
                toast.error("Movie removed from favorites !")
            }
        } catch (error) {
            console.log(error);
        }
        if (favoriteMoviesError) {
            toast.error("Sorry, an error has occurred. if you are not logged in, please first login !")
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
            if (!isMovieWatchListed) {
                toast.success("Movie successfully added to watchlist !")
            } else {
                toast.error("Movie removed from watchlist !")
            }
        } catch (error) {
            console.log(error);
        }
        if (watchListMoviesError) {
            toast.error("Sorry, an error has occurred. if you are not logged in, please first login !")
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
            <Grid sx={{ position: 'relative' }} item xs={12} sm={data?.poster_path ? 6 : 0} md={data?.poster_path ? 5 : 0} >
                <Box
                    component="img"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: { xs: '100vw', sm: 'calc(100vw - 240px)' },
                        height: '107%',
                        zIndex: '-1',
                        mx: '-1em',
                        my: '-1.6rem',
                        transform: 'rotateZ(180deg)'
                    }}
                    alt="background"
                    src={theme.palette.mode === 'light' ? BG_BLUE : BG_RED}
                />
                <Poster w="w500" path={data?.poster_path} title={data?.title} />
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