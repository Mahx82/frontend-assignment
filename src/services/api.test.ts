import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchMovies, fetchMovieDetails } from './api';

vi.mock('axios');
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe('api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchMovies', () => {
    it('returns movies data on success', async () => {
      const movies = [{ id: 1, name: 'Movie 1' }];
      mockedAxios.get = vi.fn().mockResolvedValue({ data: movies });
      const result = await fetchMovies();
      expect(result).toEqual(movies);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.tvmaze.com/shows',
      );
    });

    it('returns empty array if data is undefined', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: undefined });
      const result = await fetchMovies();
      expect(result).toEqual([]);
    });

    it('throws error on failure', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.get = vi.fn().mockRejectedValue({ message: 'Network error' });
      await expect(fetchMovies()).rejects.toThrow('Failed to fetch movies');
      spy.mockRestore();
    });
  });

  describe('fetchMovieDetails', () => {
    it('returns movie details on success', async () => {
      const movie = { id: 1, name: 'Movie 1' };
      mockedAxios.get = vi.fn().mockResolvedValue({ data: movie });
      const result = await fetchMovieDetails('1');
      expect(result).toEqual(movie);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.tvmaze.com/shows/1',
      );
    });

    it('throws error on failure', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.get = vi.fn().mockRejectedValue({ message: 'Network error' });
      await expect(fetchMovieDetails('1')).rejects.toThrow(
        'Failed to fetch movie details',
      );
      spy.mockRestore();
    });
  });
});
