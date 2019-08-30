import React, { Component } from "react";
import MovieCard from "../movieCard";
import { movies$ } from "../../movies";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      categories: [],
      liked: [],
      disliked: [],
      filters: [],
      filteredMovies: [],
      loading: true
    };
  }
  componentDidMount() {
    this.setData();
  }

  getCategories = movies => {
    const categories = movies
      .map(movie => movie.category)
      .reduce(
        (unique, category) =>
          unique.includes(category) ? unique : [...unique, category],
        []
      );

    this.setState({ categories: categories });
  };
  setData = async () => {
    await movies$.then(res => this.setState({ movies: res }));
    const { movies } = this.state;
    this.getCategories(movies);
    this.setState({ loading: false });
  };

  _handelDelete = async id => {
    await this.setState({
      movies: this.state.movies.filter(movie => movie.id !== id)
    });

    this.getCategories(this.state.movies);
  };

  _togleLike = id => {
    const { liked, disliked, movies } = this.state;
    const index = movies.findIndex(obj => obj.id === id);

    if (disliked.indexOf(id) !== -1) {
      movies[index].dislikes--;
      this.setState({ disliked: disliked.filter(e => e !== id) });
      this.setState({ movies: movies });
    }

    if (liked.indexOf(id) !== -1) {
      movies[index].likes--;
      this.setState({ liked: liked.filter(e => e !== id) });
      this.setState({ movies: movies });
      return;
    }
    this.setState(prevState => ({ liked: [...prevState.liked, id] }));
    movies[index].likes++;
    this.setState({ movies: movies });
  };

  _togleDislike = id => {
    const { liked, disliked, movies } = this.state;
    const index = movies.findIndex(obj => obj.id === id);

    if (disliked.indexOf(id) !== -1) {
      movies[index].dislikes--;
      this.setState({ disliked: disliked.filter(e => e !== id) });
      this.setState({ movies: movies });
      return;
    }

    if (liked.indexOf(id) !== -1) {
      movies[index].likes--;
      this.setState({ liked: liked.filter(e => e !== id) });
      this.setState({ movies: movies });
    }
    this.setState(prevState => ({ disliked: [...prevState.disliked, id] }));
    movies[index].dislikes++;
    this.setState({ movies: movies });
  };

  _togeleFilter = async category => {
    const { filters } = this.state;
    if (filters.includes(category)) {
      await this.setState({ filters: filters.filter(e => e !== category) });
      console.log(this.state.filters);

      return;
    }
    await this.setState({ filters: [...filters, category] });
    console.log(this.state.filters);
  };

  render() {
    const { loading, movies, categories, filters } = this.state;
    const displayMovies = movies
      .filter(movie => !filters.includes(movie.category))
      .map((element, index) => (
        <MovieCard
          key={element.id}
          id={element.id}
          title={element.title}
          category={element.category}
          likes={element.likes}
          dislikes={element.dislikes}
          _handelDelete={this._handelDelete}
          _togleLike={this._togleLike}
          _togleDislike={this._togleDislike}
        />
      ));

    const filterButtons = categories.map((category, index) => (
      <button key={index} onClick={() => this._togeleFilter(category)}>
        {category}
      </button>
    ));
    return loading ? (
      <div>
        <h1>loading ...</h1>
      </div>
    ) : (
      <div>
        <div>{filterButtons}</div>
        <div className={"movies-container"}>{displayMovies}</div>
      </div>
    );
  }
}

export default MoviesList;
