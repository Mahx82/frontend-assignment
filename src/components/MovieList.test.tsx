import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieList } from './MovieList';
import { MemoryRouter } from 'react-router';
import { FAVORITE_MOVIES_KEY } from '@/constants';

const movies = [
  { id: 1, name: 'Movie 1', image: { medium: 'img1.jpg' } },
  { id: 2, name: 'Movie 2', image: { medium: 'img2.jpg' } },
];

describe('MovieList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders a list of movies', () => {
    render(
      <MemoryRouter>
        <MovieList movies={movies} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('allows toggling favorites', () => {
    render(
      <MemoryRouter>
        <MovieList movies={movies} />
      </MemoryRouter>,
    );

    const favButtons = screen.getAllByRole('button', {
      name: /add to favorites/i,
    });
    expect(favButtons.length).toBe(2);

    expect(favButtons[0].querySelector('svg')).toBeInTheDocument();

    fireEvent.click(favButtons[0]);

    const stored = JSON.parse(
      localStorage.getItem(FAVORITE_MOVIES_KEY) || '[]',
    );
    expect(stored).toContain(1);

    fireEvent.click(favButtons[0]);
    const storedAfter = JSON.parse(
      localStorage.getItem(FAVORITE_MOVIES_KEY) || '[]',
    );
    expect(storedAfter).not.toContain(1);
  });
});
