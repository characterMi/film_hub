import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Poster from "./Poster";

const SearchResultCard = ({ movie, theme, setIsModalOpen }) => {
    const navigate = useNavigate();

    return (
        <Grid
            item
            container
            xs={12}
            sm={6}
            onClick={() => {
                navigate(`/movie/${movie?.id}`);
                setIsModalOpen(false);
            }}
            sx={{ cursor: "pointer" }}
        >
            <Grid item xs={4} sx={{ height: "100%", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}>
                <Poster
                    path={movie?.poster_path}
                    title={movie?.title}
                    w="w500"
                    type="card"
                />
            </Grid>

            <Grid
                item
                xs={8}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    height: "100%",
                    px: "1rem",
                    py: "0.25rem"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bolder",
                        color: theme.palette.mode === "light" ? "#2b2b2b" : "#e6e6e6"
                    }}
                    className="line-clamp-1"
                >
                    {movie.title ?? movie.name ?? "No title"}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "0.8rem",
                        color: theme.palette.mode === "light" ? "#2b2b2b" : "#e6e6e6",
                        opacity: 0.7
                    }}
                    className="line-clamp-3"
                >
                    {movie.overview || "No description..."}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default SearchResultCard