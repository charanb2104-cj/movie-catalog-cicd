import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiUrl}/movies`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data.movies || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Movie Picture Catalog</h1>
      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: 'red' }}>Error loading movies: {error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default App;
