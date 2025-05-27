import { IMovie } from '@/types';
import axios, { AxiosError } from 'axios';

const API_URL = 'https://api.tvmaze.com/shows';

export const fetchMovies = async (): Promise<IMovie[]> => {
  try {
    const response = await axios.get<IMovie[]>(API_URL);
    return response.data ?? [];
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error('Error fetching movies:', err.message);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchMovieDetails = async (id: string): Promise<IMovie> => {
  try {
    const response = await axios.get<IMovie>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error('Error fetching movie details:', err.message);
    throw new Error('Failed to fetch movie details');
  }
};
