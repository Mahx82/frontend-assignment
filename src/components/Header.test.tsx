import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router';

describe('Header', () => {
  it('renders the title and the link to home', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /Movies Explorer App/i });

    expect(link).toHaveAttribute('href', '/');
  });
});
