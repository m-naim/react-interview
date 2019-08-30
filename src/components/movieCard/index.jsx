import React, { Component } from "react";
import { LikeButton } from "../moviesList/buttons";

class MovieCard extends Component {
  render() {
    const {
      id,
      title,
      category,
      likes,
      dislikes,
      liked,
      disliked,
      _togleLike,
      _togleDislike,
      _handelDelete
    } = this.props;

    return (
      <div className={"movies-card"}>
        <p className={"movie-title"}>{title}</p>
        <p>{category} </p>

        <div>
          <LikeButton
            onClick={() => _togleLike(id)}
            active={liked.includes(id) ? "active" : ""}
            value={"like"}
          />
          <span>{likes} </span>
          <LikeButton
            onClick={() => _togleDislike(id)}
            active={disliked.includes(id) ? "active" : ""}
            value={"disike"}
          />
          <span>{dislikes} </span>
        </div>
        <button onClick={() => _handelDelete(id)}>delete</button>
      </div>
    );
  }
}

export default MovieCard;
