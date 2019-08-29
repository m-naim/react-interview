import React from 'react';
import './App.css';
import MoviesList from '../moviesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Particeep movie store</h1>
      </header>

      <MoviesList />
    </div>
  );
}

export default App;
