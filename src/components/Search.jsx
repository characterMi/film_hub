import { SearchOutlined } from "@mui/icons-material";
import { Box, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMovie } from "../features/currentGenreOrCategory";
import SearchInput from "./SearchInput";
import SearchResultCard from "./SearchResultCard";

const SearchModal = ({ theme, isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const handleKeyPress = (e, q) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(q));
      navigate("/");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      closeAfterTransition
      sx={{
        padding: "2rem 1rem",
        overflow: "auto",
      }}
      slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)" } } }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "768px",
          margin: "auto",
          backgroundColor: theme.palette.mode === "light" ? "#ececec" : "#1a1a1a",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <SearchInput
          theme={theme}
          setData={setData}
          setIsModalOpen={setIsModalOpen}
          handleKeyPress={handleKeyPress}
        />

        <Grid
          container
          mt="1rem"
          rowGap="1rem"
        >
          {data.slice(0, 6).map((movie, i) => (
            <SearchResultCard key={movie.id} movie={movie} theme={theme} setIsModalOpen={setIsModalOpen} />
          ))}
        </Grid>
      </Box>
    </Modal>
  );
}

const Search = ({ theme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
      <Box
        onClick={() => setIsModalOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: theme.palette.mode === "light" ? "#ececec" : "#1a1a1a",
          padding: "0.75rem 3rem",
          borderRadius: "9999px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <SearchOutlined sx={{ color: theme.palette.mode === "light" ? "#646464" : "#d1d1d1" }} />
        <Typography
          sx={{
            color: theme.palette.mode === "light" ? "#646464" : "#d1d1d1",
            whiteSpace: "nowrap",
          }}
        >
          Search for a movie...
        </Typography>
      </Box>

      {isModalOpen && (
        <SearchModal
          theme={theme}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Box>
  );
};

export default Search;
