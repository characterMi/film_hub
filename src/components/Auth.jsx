import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser, userSelector } from "../features/auth";
import { createSessionId, fetchToken, moviesApi } from "../utils";
import Loader from "./Loader";

const Auth = ({ isMobile, theme }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("request_token");
    const session_IdFromLocalStorage = localStorage.getItem("session_id");

    useEffect(() => {
        const loginUser = async () => {
            if (!token) return;

            setLoading(true);
            try {
                // Check if the user Logged in or not
                if (session_IdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(
                        `/account?session_id=${session_IdFromLocalStorage}`
                    );
                    dispatch(setUser(userData));
                } else {
                    const session_Id = await createSessionId();
                    const { data: userData } = await moviesApi.get(
                        `/account?session_id=${session_Id}`
                    );
                    dispatch(setUser(userData));
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        loginUser();
    }, [token]);

    const handleClick = async () => {
        setLoading(true);

        await fetchToken();

        setLoading(false);
    }

    return (
        <>
            {loading
                ? (
                    <div style={{ marginTop: "-5rem" }}>
                        <Loader size="1.5rem" />
                    </div>
                ) : (
                    <Box>
                        {!isAuthenticated ? (
                            <Button
                                color={theme.palette.mode === "light" ? "inherit" : "error"}
                                onClick={handleClick}
                            >
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color={theme.palette.mode === "light" ? "inherit" : "error"}
                                to={`/profile`}
                                component={Link}
                                sx={{
                                    "&:hover": {
                                        color: "#fff !important",
                                        textDecoration: "none",
                                    },
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    sx={{ width: 30, height: 30 }}
                                    alt={user?.username}
                                    src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`}
                                />
                                {!isMobile && (
                                    <>&nbsp; {user?.name || user?.username?.slice(0, 10)}</>
                                )}
                            </Button>
                        )}
                    </Box>
                )
            }
        </>
    )
}
export default Auth