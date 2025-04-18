import { Close, SearchOutlined } from "@mui/icons-material";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getMoviesBySearchQuery } from "../features/searchMovie";
import { useAppType } from "../hooks/useAppType";
import { useDebounce } from "../hooks/useDebounce";

const SearchInput = ({ theme, setData, setIsModalOpen, handleKeyPress }) => {
    const [query, setQuery] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const type = useAppType();

    useEffect(() => {
        if (debouncedQuery.trim() !== "") {
            (async function () {
                setIsFetching(true);
                const result = await getMoviesBySearchQuery(debouncedQuery, type);
                setData(result);
                setIsFetching(false);
            })();
        } else {
            setData([]);
        }
    }, [debouncedQuery]);

    return (
        <TextField
            value={query}
            onKeyDown={(e) => {
                handleKeyPress(e, query);
                if (e.key === "Escape" || e.key === "Enter") {
                    setIsModalOpen(false);
                    setQuery("");
                }
            }}
            onChange={(e) => setQuery(e.target.value)}
            variant="standard"
            autoFocus
            fullWidth
            InputProps={{
                color: theme.palette.mode === "light" ? "primary" : "error",
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchOutlined sx={{ color: theme.palette.mode === "light" ? "#646464" : "#d1d1d1" }} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {isFetching ? (
                            <CircularProgress
                                color={theme.palette.mode === "light" ? "primary" : "error"}
                                size={"1.5rem"}
                            />
                        ) : (
                            <Close
                                sx={{
                                    color: theme.palette.mode === "light" ? "#646464" : "#d1d1d1",
                                    "&:hover": {
                                        color: theme.palette.mode === "light" ? "black" : "white",
                                    },
                                    transition: "0.2s color ease-in-out",
                                    cursor: "pointer",
                                }}
                                onClick={() => setIsModalOpen(false)}
                            />
                        )}
                    </InputAdornment>
                ),
                placeholder: "Search for a movie...",
                style: {
                    fontSize: "1rem",
                    paddingBottom: "0.25rem",
                    color: theme.palette.mode === "light" ? "#646464" : "#d1d1d1",
                }
            }}
        />
    );
}

export default SearchInput;
