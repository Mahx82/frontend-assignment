import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMoviesToDisplay } from './useMoviesToDisplay';

const mockUseMovies = vi.fn();
vi.mock('./queries', () => ({
  useMovies: () => mockUseMovies(),
}));

const mockUseLocation = vi.fn();
vi.mock('react-router', () => ({
  useLocation: () => mockUseLocation(),
}));

import { FAVORITE_MOVIES_KEY, SHOW_FAVORITES_QUERY_PARAM } from '@/constants';

const movies = [
  { id: 1, name: 'Movie 1' },
  { id: 2, name: 'Movie 2' },
];

describe('useMoviesToDisplay', () => {
  beforeEach(() => {
    localStorage.clear();
    mockUseMovies.mockReset();
    mockUseLocation.mockReset();
  });

  it('returns all movies when showFavorites is false', () => {
    mockUseLocation.mockReturnValue({ search: '' });
    mockUseMovies.mockReturnValue({
      data: movies,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useMoviesToDisplay());

    expect(result.current.movies).toEqual(movies);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('returns only favorite movies when showFavorites is true', () => {
    localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify([2]));
    mockUseLocation.mockReturnValue({
      search: `?${SHOW_FAVORITES_QUERY_PARAM}=true`,
    });
    mockUseMovies.mockReturnValue({
      data: movies,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useMoviesToDisplay());

    expect(result.current.movies).toEqual([{ id: 2, name: 'Movie 2' }]);
  });

  it('returns empty array if no favorites match', () => {
    localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify([99]));
    mockUseLocation.mockReturnValue({
      search: `?${SHOW_FAVORITES_QUERY_PARAM}=true`,
    });
    mockUseMovies.mockReturnValue({
      data: movies,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useMoviesToDisplay());

    expect(result.current.movies).toEqual([]);
  });

  it('returns loading and error states from useMovies', () => {
    mockUseLocation.mockReturnValue({ search: '' });
    mockUseMovies.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    let { result } = renderHook(() => useMoviesToDisplay());

    expect(result.current.isLoading).toBe(true);

    mockUseMovies.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: { message: 'Error' },
    });

    result = renderHook(() => useMoviesToDisplay()).result;

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual({ message: 'Error' });
  });
});
