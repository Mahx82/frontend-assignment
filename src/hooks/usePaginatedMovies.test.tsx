import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePaginatedMovies } from './usePaginatedMovies';

const movies = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `Movie ${i + 1}`,
  image: { medium: `img${i + 1}.jpg` },
  summary: `Summary for Movie ${i + 1}`,
  genres: ['Drama', 'Action'],
}));

describe('usePaginatedMovies', () => {
  it('returns correct initial page and paginated movies', () => {
    const { result } = renderHook(() => usePaginatedMovies(movies, 20));
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedMovies).toHaveLength(20);
    expect(result.current.paginatedMovies[0].id).toBe(1);
    expect(result.current.paginatedMovies[19].id).toBe(20);
  });

  it('goes to next and previous page', () => {
    const { result } = renderHook(() => usePaginatedMovies(movies, 20));
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.page).toBe(2);
    expect(result.current.paginatedMovies[0].id).toBe(21);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.page).toBe(1);
    expect(result.current.paginatedMovies[0].id).toBe(1);
  });

  it('does not go below page 1 or above totalPages', () => {
    const { result } = renderHook(() => usePaginatedMovies(movies, 20));
    act(() => {
      result.current.prevPage();
    });
    expect(result.current.page).toBe(1);

    act(() => {
      result.current.goToPage(10);
    });
    expect(result.current.page).toBe(3);

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.page).toBe(3);
  });

  it('shows correct movies on last page', () => {
    const { result } = renderHook(() => usePaginatedMovies(movies, 20));
    act(() => {
      result.current.goToPage(3);
    });
    expect(result.current.page).toBe(3);
    expect(result.current.paginatedMovies).toHaveLength(5);
    expect(result.current.paginatedMovies[0].id).toBe(41);
    expect(result.current.paginatedMovies[4].id).toBe(45);
  });
});
