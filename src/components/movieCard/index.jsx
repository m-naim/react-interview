import React, { Component } from "react";

class MovieCard extends Component {
  render() {
    return (
      <div className={"movies-card"}>
        <p>{this.props.title}</p>
        <p>{this.props.category} </p>

        <p>{this.props.likes} </p>
        <p>{this.props.dislikes} </p>
      </div>
    );
  }
}

export default MovieCard;
