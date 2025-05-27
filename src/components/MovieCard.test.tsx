import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { MemoryRouter } from 'react-router';

describe('MovieCard', () => {
  const defaultProps = {
    id: 1,
    name: 'Test Movie',
    image: 'test.jpg',
    isFavorite: false,
    onToggleFavorites: vi.fn(),
  };

  it('renders movie name and image', () => {
    render(
      <MemoryRouter>
        <MovieCard {...defaultProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute(
      'src',
      'test.jpg',
    );
  });

  it('links to the correct movie detail page', () => {
    render(
      <MemoryRouter>
        <MovieCard {...defaultProps} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/1');
  });

  it('calls onToggleFavorites and prevents navigation when heart button is clicked', () => {
    const onToggleFavorites = vi.fn();
    render(
      <MemoryRouter>
        <MovieCard {...defaultProps} onToggleFavorites={onToggleFavorites} />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /add to favorites/i });
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = vi.fn();
    event.stopPropagation = vi.fn();
    button.dispatchEvent(event);

    expect(onToggleFavorites).toHaveBeenCalledWith(1);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
