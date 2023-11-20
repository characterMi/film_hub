import { Divider, List, ListSubheader } from '@mui/material'
import { Link } from 'react-router-dom'
import genreIcons from "../assets/genres"

import LightLogo from '../assets/logo/LOGO_LIGHTTHEME.png';
import DarkLogo from '../assets/logo/LOGO_DARKTHEME.png';
import { useGetGenresQuery } from '../services/TMDB';
import { CategoryAndGenre, Error, Loader } from './';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ theme }) => {
    const { data, error, isFetching } = useGetGenresQuery();

    if (error) {
        return (
            <Error text="Oops ! No results" />
        )
    }
    return (
        <>
            <Link to="/" style={{ display: 'flex', justifyContent: 'center', padding: '10% 0' }}>
                <img
                    src={theme.palette.mode === 'light' ? LightLogo : DarkLogo}
                    alt="FilmHub Logo"
                    style={{ width: '70%' }}
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }, i) => (
                    <CategoryAndGenre key={i} theme={theme} value={value} src={genreIcons[label.toLowerCase()]} text={label} />
                ))}
            </List>
            <Divider />
            {isFetching
                ? <Loader theme={theme} size="4rem" />
                : (
                    <List>
                        <ListSubheader>Genres</ListSubheader>
                        {data?.genres?.map((genre, i) => (
                            <CategoryAndGenre key={i} theme={theme} value={genre?.id} src={genreIcons[genre?.name?.toLowerCase()]} text={genre?.name} />
                        ))}
                    </List>
                )
            }
        </>
    )
}

export default Sidebar