import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Error from "./Error";
import Loader from "./Loader";
import RatedCards from "./RatedCards";

const UserMovies = ({
    theme,
    fallbackText,
    title,
    movies,
    isLoading,
    isError,
}) => {
    const sessionId = localStorage.getItem("session_id");

    if (isLoading) return <Loader size="6rem" />;

    if (isError)
        return <Error
            backButton={!!sessionId}
            theme={theme}
            text={sessionId ? "Something went wrong !" : "No Movies Found. Please login first !"}
        />;

    return (
        <Box mb="2rem" mt="2rem">
            {movies.length < 1 ? (
                <Typography variant="h5">
                    {fallbackText}
                </Typography>
            ) : (
                <Box>
                    <RatedCards
                        theme={theme}
                        title={title}
                        data={movies}
                    />
                </Box>
            )}
        </Box>
    )
}

const MemoedUserMovies = memo(UserMovies);

export default MemoedUserMovies;