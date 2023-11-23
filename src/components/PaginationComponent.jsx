import { Box, Pagination, useMediaQuery } from '@mui/material'

const PaginationComponent = ({ movies, page, setCurrentPage, theme }) => {
  // Change the page
  const paginate = (e, value) => {
    setCurrentPage(value)
    window.scrollTo({
      top: 0, behavior: "smooth"
    })
  };

  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        my: '30px'
      }}
    >
      {
        movies?.results?.length > 0 ?
        (
          <Pagination
            color={theme.palette.mode === 'light' ? "primary" : "error"}
            shape="rounded"
            defaultPage={1}
            count={movies?.total_pages < 500 ? movies?.total_pages : 500}
            page={page}
            onChange={paginate}
            size={isMobile ? "medium" : "large"}
          />
        ) :
        null
      }
    </Box>
  )
}

export default PaginationComponent