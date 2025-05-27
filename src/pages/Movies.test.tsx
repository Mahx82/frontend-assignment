import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Movies } from './Movies';
import type { IMovie } from '@/types';

vi.mock('@/components/MovieList', () => ({
  MovieList: ({ movies }: { movies: IMovie[] }) => (
    <ul>
      {movies.map((m) => (
        <li key={m.id}>{m.name}</li>
      ))}
    </ul>
  ),
}));

const mockUseMoviesToDisplay = vi.fn();
vi.mock('@/hooks/useMoviesToDisplay', () => ({
  useMoviesToDisplay: () => mockUseMoviesToDisplay(),
}));

const mockUsePaginatedMovies = vi.fn();
vi.mock('@/hooks/usePaginatedMovies', () => ({
  usePaginatedMovies: (movies: IMovie[], pageSize: number) =>
    mockUsePaginatedMovies(movies, pageSize),
}));

const moviesSample = [
  { id: 1, name: 'Movie 1', image: { medium: 'img1.jpg' } },
  { id: 2, name: 'Movie 2', image: { medium: 'img2.jpg' } },
];

describe('Movies', () => {
  beforeEach(() => {
    mockUseMoviesToDisplay.mockReset();
    mockUsePaginatedMovies.mockReset();
  });

  it('shows loading state', () => {
    mockUseMoviesToDisplay.mockReturnValue({
      movies: [],
      isLoading: true,
      isError: false,
      error: null,
    });
    mockUsePaginatedMovies.mockReturnValue({
      page: 1,
      totalPages: 1,
      paginatedMovies: [],
      nextPage: vi.fn(),
      prevPage: vi.fn(),
    });
    render(<Movies />);
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseMoviesToDisplay.mockReturnValue({
      movies: [],
      isLoading: false,
      isError: true,
      error: { message: 'Error!' },
    });
    mockUsePaginatedMovies.mockReturnValue({
      page: 1,
      totalPages: 1,
      paginatedMovies: [],
      nextPage: vi.fn(),
      prevPage: vi.fn(),
    });
    render(<Movies />);
    expect(screen.getByText(/error!/i)).toBeInTheDocument();
  });

  it('renders movies and pagination', () => {
    mockUseMoviesToDisplay.mockReturnValue({
      movies: moviesSample,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockUsePaginatedMovies.mockReturnValue({
      page: 1,
      totalPages: 2,
      paginatedMovies: moviesSample,
      nextPage: vi.fn(),
      prevPage: vi.fn(),
    });
    render(<Movies />);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('calls nextPage and prevPage on button click', () => {
    const nextPage = vi.fn();
    const prevPage = vi.fn();
    mockUseMoviesToDisplay.mockReturnValue({
      movies: moviesSample,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockUsePaginatedMovies.mockReturnValue({
      page: 2,
      totalPages: 3,
      paginatedMovies: moviesSample,
      nextPage,
      prevPage,
    });
    render(<Movies />);
    fireEvent.click(screen.getByRole('button', { name: /prev/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(prevPage).toHaveBeenCalled();
    expect(nextPage).toHaveBeenCalled();
  });
});
