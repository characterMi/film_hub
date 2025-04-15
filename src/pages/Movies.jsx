import { useSelector } from "react-redux";

import {
  Error,
  Loader,
  MovieList,
  MoviePoster,
  Pagination,
} from "../components";
import { usePagination } from "../hooks/usePagination";
import { useGetMoviesQuery } from "../services/TMDB";

const Movies = ({ theme }) => {
  const [currentPage, setCurrentPage] = usePagination();
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page: currentPage,
    searchQuery,
  });

  if (isFetching) return <Loader size="4rem" />;

  if (error) return <Error text="An error has occurred." />;

  if (!data?.results?.length) {
    return (
      <Error
        text={
          <>
            no movies that match that name.
            <br />
            Please search for something else.
          </>
        }
      />
    );
  }

  return (
    <div>
      <MoviePoster movie={data?.results[0]} />
      <MovieList movies={data?.results ?? []} theme={theme} />
      <Pagination
        numberOfPages={data?.total_pages ?? 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
      />
    </div>
  );
};

export default Movies;
