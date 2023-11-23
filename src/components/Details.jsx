import genreIcons from "../assets/genres";
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { Box, Grid, Rating, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

const Details = ({ data, theme }) => {
    const dispatch = useDispatch()
    return (
        <>
            <Typography sx={{ fontSize: { xs: '38px', sm: '32px', md: '38px', lg: '46px', xl: '66px' } }} align="center" gutterBottom>
                {data?.title} ({data?.release_date.split('-')[0]})
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                {data?.tagline}
            </Typography>
            <Grid item className='container-space-around' sx={{ flexWrap: "wrap !important" }}>
                <Box display="flex" align="center">
                    <Rating readOnly value={data?.vote_average / 2} precision={0.1} />
                    <Typography variant="subtitle1" ml="10px" gutterBottom>
                        {Math.ceil(data?.vote_average * 5) / 10} / 5
                    </Typography>
                </Box>
                <Typography variant="h6" align="center" gutterBottom sx={{ ml: '15px !important' }}>
                    {data?.runtime}min | Language: {data?.original_language?.toUpperCase()}
                </Typography>
            </Grid>
            <Grid item sx={{ m: '10px 0 !important', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {data?.genres?.map((genre, index) => (
                    <Box component={Link} key={index} to="/" onClick={() => dispatch(selectGenreOrCategory(genre?.id))} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", p: { xs: '0.5rem 1rem', md: '0' }, ml: '5px', textDecoration: "none" }}>
                        <Box component="img" src={genreIcons[genre?.name.toLowerCase()]} alt="Genres" sx={{ height: 30, filter: theme.palette.mode === 'dark' && 'invert(1)', mr: '10px' }} />
                        <Typography color="textPrimary" variant="subtitle1">
                            {genre?.name}
                        </Typography>
                    </Box>
                ))}
            </Grid>
            <Typography variant="h5" gutterBottom mt="10px">
                Overview
            </Typography>
            <Typography mb="2rem">
                {data?.overview}
            </Typography>
        </>
    )
}

export default Details