import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [searchParams] = useSearchParams();
  const pageFromSearchParams = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(+pageFromSearchParams || 1);

  useEffect(() => {
    if (pageFromSearchParams && pageFromSearchParams > 0) {
      return setCurrentPage(+pageFromSearchParams);
    }

    setCurrentPage(1);
  }, [pageFromSearchParams]);

  return [currentPage, setCurrentPage];
};
