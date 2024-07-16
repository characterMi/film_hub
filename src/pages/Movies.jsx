import { useSelector } from "react-redux";

import {
  Error,
  Loader,
  MainPoster,
  MovieList,
  PaginationComponent,
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
      <MainPoster movie={data?.results[0]} />
      <MovieList movies={data} theme={theme} />
      <PaginationComponent
        movies={data}
        page={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
      />
    </div>
  );
};

export default Movies;
