import { Box } from '@mui/material'

const Poster = ({ w, path, title, theme }) => (
    <Box
        component="img"
        src={`https://image.tmdb.org/t/p/${w}/${path}`}
        alt={title}
        sx={{
            borderRadius: '10px',
            boxShadow: theme.palette.mode === 'light' && '0.5em 1em 1em rgb(64, 64, 70)',
            width: '100%',
            mb: { xs: '30px', md: 0 },
            m: { xs: '0 auto', lg: 0 },
            display: path ? 'block' : 'none',
            objectFit: 'cover'
        }}
    />
)

export default Poster