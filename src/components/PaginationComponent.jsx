import { Box, Pagination, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const PaginationComponent = ({ movies, page, setCurrentPage, theme }) => {
  const [_, setSearchParams] = useSearchParams();

  const paginate = (_, value) => {
    setSearchParams({ page: value });

    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: "30px",
      }}
    >
      {movies?.total_pages > 1 ? (
        <Pagination
          color={theme.palette.mode === "light" ? "primary" : "error"}
          shape="rounded"
          defaultPage={1}
          count={movies?.total_pages < 500 ? movies?.total_pages : 500}
          page={page}
          onChange={paginate}
          size={isMobile ? "medium" : "large"}
        />
      ) : null}
    </Box>
  );
};

export default PaginationComponent;
