import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '@/services/api';
import { useMovies, useMovieDetails } from './queries';

vi.mock('@/services/api', () => ({
  fetchMovies: vi.fn(),
  fetchMovieDetails: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('queries hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useMovies calls fetchMovies and returns data', async () => {
    const movies = [{ id: 1, name: 'Movie 1' }];
    (api.fetchMovies as ReturnType<typeof vi.fn>).mockResolvedValue(movies);

    const { result } = renderHook(() => useMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(api.fetchMovies).toHaveBeenCalled();
    expect(result.current.data).toEqual(movies);
  });

  it('useMovieDetails calls fetchMovieDetails and returns data', async () => {
    const movie = { id: 1, name: 'Movie 1' };
    (api.fetchMovieDetails as ReturnType<typeof vi.fn>).mockResolvedValue(
      movie,
    );

    const { result } = renderHook(() => useMovieDetails('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(api.fetchMovieDetails).toHaveBeenCalledWith('1');
    expect(result.current.data).toEqual(movie);
  });
});
