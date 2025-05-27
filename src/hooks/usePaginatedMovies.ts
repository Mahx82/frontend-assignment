import { useState, useMemo } from 'react';
import type { IMovie } from '@/types';

export const usePaginatedMovies = (movies: IMovie[], pageSize = 20) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(movies.length / pageSize);

  const paginatedMovies = useMemo(
    () => movies.slice((page - 1) * pageSize, page * pageSize),
    [movies, page, pageSize],
  );

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return {
    page,
    totalPages,
    paginatedMovies,
    goToPage,
    nextPage: () => goToPage(page + 1),
    prevPage: () => goToPage(page - 1),
  };
};
