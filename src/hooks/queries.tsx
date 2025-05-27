import { fetchMovieDetails } from '@/services/api';
import { fetchMovies } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const useMovies = () =>
  useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

export const useMovieDetails = (id: string) =>
  useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovieDetails(id),
  });
