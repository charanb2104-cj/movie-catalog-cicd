import React from 'react';

function MovieList({ movies = [] }) {
  if (movies.length === 0) {
    return <p>No movies available.</p>;
  }

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} style={{ margin: '0.5rem 0' }}>
            <strong>{movie.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
