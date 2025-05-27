import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';

vi.mock('react-router', () => ({
  useParams: () => ({ id: '1' }),
}));

const mockUseMovieDetails = vi.fn();
vi.mock('@/hooks/queries', () => ({
  useMovieDetails: (id: string) => mockUseMovieDetails(id),
}));

describe('MovieDetails', () => {
  beforeEach(() => {
    mockUseMovieDetails.mockReset();
  });

  it('shows loading state', () => {
    mockUseMovieDetails.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<MovieDetails />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseMovieDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: 'Error message' },
    });

    render(<MovieDetails />);

    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  it('shows "No movie found" if data is null', () => {
    mockUseMovieDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<MovieDetails />);

    expect(screen.getByText(/no movie found/i)).toBeInTheDocument();
  });

  it('renders movie details', () => {
    mockUseMovieDetails.mockReturnValue({
      data: {
        name: 'Test Movie',
        image: { medium: 'test.jpg' },
        summary: '<p>Test summary </p>',
        genres: ['Drama', 'Action'],
      },
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<MovieDetails />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute(
      'src',
      'test.jpg',
    );
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();
  });
});
