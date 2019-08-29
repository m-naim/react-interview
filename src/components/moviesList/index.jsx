import React, { Component } from "react";
import MovieCard from "../movieCard";
import { movies$ } from "../../movies";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    movies$.then(res => this.setState({ movies: res }));
  }
  render() {
    const displayMovies = this.state.movies.map((element, index) => (
      <MovieCard
        key={element.id}
        title={element.title}
        category={element.category}
        likes={element.likes}
        dislikes={element.dislikes}
      />
    ));

    return (
      <div>
        <div className={"movies-container"}>{displayMovies}</div>

        <button onClick={() => console.log(this.state.movies)}>ok</button>
      </div>
    );
  }
}

export default MoviesList;
