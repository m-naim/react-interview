import React, { Component } from "react";

class MovieCard extends Component {
  render() {
    const {
      id,
      title,
      category,
      likes,
      dislikes,
      _togleLike,
      _togleDislike,
      _handelDelete
    } = this.props;

    return (
      <div className={"movies-card"}>
        <p>{title}</p>
        <p>{category} </p>

        <div>
          <button onClick={() => _togleLike(id)}>like</button>
          <span>{likes} </span>
          <button onClick={() => _togleDislike(id)}>dislike</button>
          <span>{dislikes} </span>
        </div>
        <button onClick={() => _handelDelete(id)}>delete</button>
      </div>
    );
  }
}

export default MovieCard;
