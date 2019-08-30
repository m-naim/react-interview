import React, { Component } from "react";
import MovieCard from "../movieCard";
import { FilterButton, NumberButton } from "./buttons";
import { connect } from "react-redux";
import {
  getData,
  _handelDelete,
  _togeleFilter,
  _togleDislike,
  _handleMoviePerPageValue,
  _handleChangePage,
  _togleLike
} from "../../actions/Movieactions";

class MoviesList extends Component {
  componentDidMount() {
    this.props.getData();
  }

  _togeleFilter = category => {
    this.props._togeleFilter(category);
  };

  _handleChangePage = val => {
    this.props._handleChangePage(val);
  };

  _handleMoviePerPageValue = e => {
    const value = parseInt(e.target.value);
    this.props._handleMoviePerPageValue(value);
  };

  render() {
    const {
      loading,
      categories,
      moviesToDispaly,
      page,
      elementsNumberByPage,
      filteredMovies,
      liked,
      disliked,
      filters
    } = this.props.store;

    const displayMovies = moviesToDispaly.map((element, index) => (
      <MovieCard
        key={element.id}
        id={element.id}
        title={element.title}
        category={element.category}
        likes={element.likes}
        dislikes={element.dislikes}
        liked={liked}
        disliked={disliked}
        _handelDelete={id => {
          this.props._handelDelete(id);
        }}
        _togleLike={id => {
          this.props._togleLike(id);
        }}
        _togleDislike={id => {
          this.props._togleDislike(id);
        }}
      />
    ));

    const filterButtons = categories.map((category, index) => (
      <FilterButton
        active={filters.includes(category) ? "" : "active"}
        key={index}
        onClick={() => this._togeleFilter(category)}
        value={category}
      />
    ));

    const btnsNumberByPage = [4, 8, 12].map((value, index) => (
      <NumberButton
        type="button"
        key={index}
        active={value === elementsNumberByPage ? "active" : ""}
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
            <button onClick={() => this._handleChangePage(-1)}>
              presedant
            </button>
            <span>
              Page
              {page + 1}/
              {Math.ceil(filteredMovies.length / elementsNumberByPage)}
            </span>
            <button onClick={() => this._handleChangePage(1)}>suivant</button>
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
  store: state.movies
});
export default connect(
  mapStateToProps,
  {
    getData,
    _handelDelete,
    _togeleFilter,
    _togleDislike,
    _togleLike,
    _handleMoviePerPageValue,
    _handleChangePage
  }
)(MoviesList);
