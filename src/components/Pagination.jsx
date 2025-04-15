import { Box, Pagination as PaginationFromMUI, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ numberOfPages, currentPage, setCurrentPage, theme }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginate = (_, value) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("page", value);

    setSearchParams(newParams);

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
      {numberOfPages > 1 ? (
        <PaginationFromMUI
          color={theme.palette.mode === "light" ? "primary" : "error"}
          shape="rounded"
          defaultPage={1}
          count={numberOfPages < 500 ? numberOfPages : 500}
          page={currentPage}
          onChange={paginate}
          size={isMobile ? "medium" : "large"}
        />
      ) : null}
    </Box>
  );
};

export default Pagination;
