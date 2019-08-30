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
      elementsNumberByPage: 4,
      page: 0,
      moviesToDispaly: [],
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
    await this.setState({ filteredMovies: movies });
    this._handlePagination();
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

  _togeleFilter = category => {
    const { filters, movies } = this.state;
    if (filters.includes(category)) {
      this.setState({ filters: filters.filter(e => e !== category) });
      return;
    } else this.setState({ filters: [...filters, category] });

    this.setState({
      filteredMovies: movies.filter(movie => !filters.includes(movie.category))
    });
  };

  _handleNextPage = async () => {
    const { page, filteredMovies, elementsNumberByPage } = this.state;
    if (filteredMovies.length / elementsNumberByPage > page + 1)
      await this.setState({ page: page + 1 });
    this._handlePagination();
  };

  _handlePrevPage = async () => {
    const { page } = this.state;
    if (page - 1 >= 0) await this.setState({ page: page - 1 });
    this._handlePagination();
  };

  _handlePagination = async () => {
    const { page, filteredMovies } = this.state;
    await this.setState({
      moviesToDispaly: filteredMovies.slice(0 + page * 4, 4 + page * 4)
    });
  };

  render() {
    const { loading, categories, moviesToDispaly } = this.state;

    const displayMovies = moviesToDispaly.map((element, index) => (
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
        <div>
          <button onClick={this._handlePrevPage}>presedant</button>
          <button onClick={this._handleNextPage}>suivant</button>
        </div>
        <div className={"movies-container"}>{displayMovies}</div>
      </div>
    );
  }
}

export default MoviesList;
