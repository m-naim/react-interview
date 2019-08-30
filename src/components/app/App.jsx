import React from "react";
import "./App.css";
import MoviesList from "../moviesList";
import { Provider } from "react-redux";
import store from "../../store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Particeep movie store</h1>
        </header>

        <MoviesList />
      </div>
    </Provider>
  );
}

export default App;
