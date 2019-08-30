import React, { Component } from "react";
import MovieCard from "../movieCard";
import { movies$ } from "../../movies";
import { FilterButton, NumberButton } from "./buttons";
import { connect } from "react-redux";
import { getData } from "../../actions/Movieactions";

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

  _handelDelete = id => {
    this.setState(
      prevState => ({
        movies: prevState.movies.filter(movie => movie.id !== id),
        filteredMovies: prevState.filteredMovies.filter(
          movie => movie.id !== id
        ),
        liked: prevState.liked.filter(movie => movie !== id),
        disliked: prevState.disliked.filter(movie => movie !== id)
      }),
      () => {
        this._handlePagination();
        this.getCategories(this.state.movies);
      }
    );
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
    let newfilters = filters;
    if (filters.includes(category))
      newfilters = filters.filter(e => e !== category);
    else newfilters = [...filters, category];

    this.setState(
      {
        filters: newfilters,
        filteredMovies: movies.filter(
          movie => !newfilters.includes(movie.category)
        )
      },
      () => {
        console.log(newfilters, this.state.filteredMovies);
        this._handlePagination();
      }
    );
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

  _handlePagination = () => {
    const { page, filteredMovies, elementsNumberByPage } = this.state;
    console.log(filteredMovies);
    this.setState({
      moviesToDispaly: filteredMovies.slice(
        0 + page * elementsNumberByPage,
        (1 + page) * elementsNumberByPage
      )
    });
  };

  _handleMoviePerPageValue = async e => {
    const value = parseInt(e.target.value);
    await this.setState({ elementsNumberByPage: value, page: 0 });
    this._handlePagination();
  };

  render() {
    const {
      loading,
      categories,
      moviesToDispaly,
      page,
      elementsNumberByPage,
      filteredMovies
    } = this.state;

    const displayMovies = moviesToDispaly.map((element, index) => (
      <MovieCard
        key={element.id}
        id={element.id}
        title={element.title}
        category={element.category}
        likes={element.likes}
        dislikes={element.dislikes}
        liked={this.state.liked}
        disliked={this.state.disliked}
        _handelDelete={this._handelDelete}
        _togleLike={this._togleLike}
        _togleDislike={this._togleDislike}
      />
    ));

    const filterButtons = categories.map((category, index) => (
      <FilterButton
        active={this.state.filters.includes(category) ? "" : "active"}
        key={index}
        onClick={() => this._togeleFilter(category)}
        value={category}
      />
    ));

    const btnsNumberByPage = [4, 8, 12].map((value, index) => (
      <NumberButton
        type="button"
        key={index}
        active={value === this.state.elementsNumberByPage ? "active" : ""}
        onClick={this._handleMoviePerPageValue}
        value={value}
      />
    ));
    return loading ? (
      <div>
        <h1>loading ...</h1>
      </div>
    ) : (
      <div>
        <div className={"filters-container"}>
          <span>filters</span>
          {filterButtons}
        </div>
        <div className={"pagination-bar"}>
          <div>
            <button onClick={this._handlePrevPage}>presedant</button>
            <span>
              Page
              {page + 1}/
              {Math.ceil(filteredMovies.length / elementsNumberByPage)}
            </span>
            <button onClick={this._handleNextPage}>suivant</button>
          </div>
          <div>
            <span>movies / page </span>
            {btnsNumberByPage}
          </div>
        </div>

        <div className={"movies-container"}>{displayMovies}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});
export default connect(
  mapStateToProps,
  { getData }
)(MoviesList);
