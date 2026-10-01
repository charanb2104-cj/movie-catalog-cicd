import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from '../MovieList';

describe('MovieList Component', () => {
  test('renders movie list with provided movies', () => {
    const mockMovies = [
      { id: '123', title: 'Top Gun: Maverick' },
      { id: '456', title: 'Sonic the Hedgehog' },
    ];
    render(<MovieList movies={mockMovies} />);
    expect(screen.getByText('Top Gun: Maverick')).toBeInTheDocument();
    expect(screen.getByText('Sonic the Hedgehog')).toBeInTheDocument();
  });

  test('renders message when no movies are available', () => {
    render(<MovieList movies={[]} />);
    expect(screen.getByText('No movies available.')).toBeInTheDocument();
  });
});
