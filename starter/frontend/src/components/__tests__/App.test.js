import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Component', () => {
  test('renders Movie Picture Catalog title', () => {
    render(<App />);
    const headingElement = screen.getByText(/Movie Picture Catalog/i);
    expect(headingElement).toBeInTheDocument();
  });
});
