import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesButton } from './FavoritesButton';
import { SHOW_FAVORITES_QUERY_PARAM } from '@/constants';

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('FavoritesButton', () => {
  it('navigates to favorites on click', () => {
    render(<FavoritesButton />);
    const btn = screen.getByRole('button', { name: /go to favorites/i });
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/?${SHOW_FAVORITES_QUERY_PARAM}=true`,
    );
  });
});
