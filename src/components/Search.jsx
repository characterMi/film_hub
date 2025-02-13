import { SearchOutlined } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMovie } from "../features/currentGenreOrCategory";

const Search = ({ theme }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
      setQuery("");
      navigate("/");
    }
  };
  return (
    <Box className="search-box">
      <TextField
        value={query}
        onKeyDown={handleKeyPress}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        sx={{
          filter: theme.palette.mode === "light" && "invert(1)",
        }}
        InputProps={{
          className: "search-input",
          color: theme.palette.mode === "light" ? "secondary" : "error",
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          placeholder: "Search for a movie...",
        }}
      />
    </Box>
  );
};

export default Search;
