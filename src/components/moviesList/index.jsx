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

  _handelDelete = id => {
    this.setState({
      movies: this.state.movies.filter(movie => movie.id !== id)
    });
  };

  render() {
    const displayMovies = this.state.movies.map((element, index) => (
      <MovieCard
        key={element.id}
        id={element.id}
        title={element.title}
        category={element.category}
        likes={element.likes}
        dislikes={element.dislikes}
        _handelDelete={this._handelDelete}
      />
    ));

    return (
      <div>
        <div className={"movies-container"}>{displayMovies}</div>
      </div>
    );
  }
}

export default MoviesList;
