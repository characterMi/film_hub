import { Box, Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppType } from "../hooks/useAppType";
import { usePagination } from "../hooks/usePagination";
import { useGetListQuery } from "../services/TMDB";
import Error from "./Error";
import Loader from "./Loader";
import Pagination from "./Pagination";
import RatedCards from "./RatedCards";

const UserMovies = ({ theme, listName, userId, fallbackText, title }) => {
  const type = useAppType();
  const sessionId = localStorage.getItem("session_id");
  const [currentPage, setCurrentPage] = usePagination();

  const { data, isFetching, error, refetch } = useGetListQuery({
    listName: `${listName}/${type === "tv" ? "tv" : "movies"}`,
    accountId: userId,
    sessionId,
    page: currentPage,
  });

  // Update lists, immediately after user added a movie to the lists
  useEffect(() => {
    if (!sessionId) {
      toast.error("You need to login to view your profile!");
      return;
    }

    const { unsubscribe } = refetch();

    return () => {
      unsubscribe();
    };
  }, []);

  if (isFetching) return <Loader size="6rem" />;

  if (error)
    return (
      <Error
        backButton={!!sessionId}
        theme={theme}
        text={
          sessionId
            ? "Something went wrong !"
            : "No Movies Found. Please login first !"
        }
      />
    );

  return (
    <>
      <Box mb="2rem" mt="2rem">
        {data?.results.length < 1 ? (
          <Typography variant="h5">{fallbackText}</Typography>
        ) : (
          <Box>
            <RatedCards theme={theme} title={title} data={data?.results} />
          </Box>
        )}
      </Box>

      <Pagination
        numberOfPages={data?.total_pages ?? 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
      />
    </>
  );
};

const MemoedUserMovies = memo(UserMovies);

export default MemoedUserMovies;
