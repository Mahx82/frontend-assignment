import { useLocation } from 'react-router';
import { useMovies } from './queries';
import { useMemo } from 'react';
import type { IMovie } from '@/types';
import { FAVORITE_MOVIES_KEY, SHOW_FAVORITES_QUERY_PARAM } from '@/constants';

export const useMoviesToDisplay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showFavorites = queryParams.get(SHOW_FAVORITES_QUERY_PARAM) === 'true';

  const { data = [], isLoading, isError, error } = useMovies();

  const movies = useMemo(() => {
    const favorites = JSON.parse(
      localStorage.getItem(FAVORITE_MOVIES_KEY) || '[]',
    ) as number[];

    if (showFavorites) {
      return data.filter((movie: IMovie) => favorites.includes(movie.id));
    }
    return data;
  }, [showFavorites, data]);

  return {
    movies,
    isLoading,
    isError,
    error,
  };
};
