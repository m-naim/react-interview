import React, { Component } from "react";
import MovieCard from "../movieCard";
import { movies$ } from "../../movies";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      liked: [],
      disliked: [],
      loading: true
    };
  }
  componentDidMount() {
    this.setData();
  }

  setData = async () => {
    await movies$.then(res => this.setState({ movies: res }));
    console.log(this.state.movies);
    this.setState({ loading: false });
  };

  _handelDelete = id => {
    this.setState({
      movies: this.state.movies.filter(movie => movie.id !== id)
    });
  };

  _togleLike = async id => {
    const { liked, disliked, movies } = this.state;
    const index = movies.findIndex(obj => obj.id === id);
    //if dislaiked
    if (disliked.indexOf(id) !== -1) console.log("disliked");
    //if liked
    if (liked.indexOf(id) !== -1) {
      movies[index].likes--;
      this.setState({ liked: liked.filter(e => e !== id) });
      this.setState({ movies: movies });
      return;
    }
    this.setState(prevState => ({ liked: [...prevState.liked, id] }));
    movies[index].likes++;
    this.setState({ movies: movies });
    console.log(liked);
  };

  render() {
    const { loading, movies } = this.state;
    const displayMovies = movies.map((element, index) => (
      <MovieCard
        key={element.id}
        id={element.id}
        title={element.title}
        category={element.category}
        likes={element.likes}
        dislikes={element.dislikes}
        _handelDelete={this._handelDelete}
        _togleLike={this._togleLike}
      />
    ));

    return (
      <div>
        <div className={"movies-container"}>
          {loading ? <h1>loading ...</h1> : displayMovies}
        </div>
      </div>
    );
  }
}

export default MoviesList;
