import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Biography, Poster } from '.'

const ActorDetails = ({ data, theme }) => (
    <>
        <Grid item xs={12} sm={data?.profile_path ? 6 : 0} md={data?.profile_path ? 5 : 0}>
            <Poster w="w780" path={data?.profile_path} title={data?.name} theme={theme} />
        </Grid>
        <Grid item xs={12} sm={data?.profile_path ? 6 : 12} md={data?.profile_path ? 7 : 12} sx={{ px: { xs: 2, lg: 4 }, mt: { xs: 2, sm: 0 }, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'hidden' }}>
            <Typography sx={{ fontSize: { xs: '38px', sm: '42px', lg: '56px', xl: '76px' } }} gutterBottom>
                {data?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Born: {new Date(data?.birthday).toDateString()}
            </Typography>
            <Biography text={data?.biography} theme={theme} />
            <Box mt="2rem" display="flex" justifyContent="center">
                <Button color={theme.palette.mode === 'light' ? 'primary' : 'error'} sx={{ mr: "15px" }} variant="contained" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
                    IMDB
                </Button>
                <Button color={theme.palette.mode === 'light' ? 'primary' : 'error'} startIcon={<ArrowBack />} variant="outlined" onClick={() => window.history.back()}>
                    Back
                </Button>
            </Box>
        </Grid>
        <Biography text={data?.biography} theme={theme} smallDevice />
    </>
)

export default ActorDetails