import {
  DELETE_MOVIE,
  GET_DATA,
  TOGEL_FILTER,
  TOGEL_LIKES,
  TOGEL_DISLIKES,
  HANDLE_ELEMENTSBYPAGE,
  HANDLE_CHANGEPAGE
} from "../actions/types";

const initialState = {
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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        movies: action.payload,
        moviesToDispaly: action.payload.slice(
          0 + state.page * state.elementsNumberByPage,
          (1 + state.page) * state.elementsNumberByPage
        ),
        filteredMovies: action.payload,
        categories: action.payload
          .map(movie => movie.category)
          .reduce(
            (unique, category) =>
              unique.includes(category) ? unique : [...unique, category],
            []
          ),
        loading: false
      };
    case DELETE_MOVIE:
      const movies = state.movies.filter(movie => movie.id !== action.payload);
      return {
        ...state,
        movies: movies,
        filteredMovies: state.filteredMovies.filter(
          movie => movie.id !== action.payload
        ),
        moviesToDispaly: state.moviesToDispaly.filter(
          movie => movie.id !== action.payload
        ),
        liked: state.liked.filter(movie => movie !== action.payload),
        disliked: state.disliked.filter(movie => movie !== action.payload),
        categories: movies
          .map(movie => movie.category)
          .reduce(
            (unique, category) =>
              unique.includes(category) ? unique : [...unique, category],
            []
          )
      };

    case TOGEL_FILTER:
      return togel(state, action);

    case TOGEL_LIKES:
      return likes(state, action.payload);
    case TOGEL_DISLIKES:
      return dislikes(state, action.payload);

    case HANDLE_ELEMENTSBYPAGE:
      return ELEMENTSBYPAGE(state, action.payload);
    case HANDLE_CHANGEPAGE:
      return changePage(state, action.payload);
    default:
      return state;
  }
}

const togel = (state, action) => {
  const { filters, movies } = state;
  let newfilters = filters;
  if (filters.includes(action.payload))
    newfilters = filters.filter(e => e !== action.payload);
  else newfilters = [...filters, action.payload];

  return {
    ...state,
    filters: newfilters,
    filteredMovies: movies.filter(
      movie => !newfilters.includes(movie.category)
    ),
    moviesToDispaly: movies.filter(
      movie => !newfilters.includes(movie.category)
    )
  };
};

const likes = (state, id) => {
  const { liked, disliked, movies } = state;
  const index = movies.findIndex(obj => obj.id === id);
  let result = state;
  if (disliked.indexOf(id) !== -1) {
    movies[index].dislikes--;
    result = {
      ...state,
      disliked: disliked.filter(e => e !== id)
    };
  }

  if (liked.indexOf(id) !== -1) {
    movies[index].likes--;
    return {
      ...state,
      liked: liked.filter(e => e !== id),
      movies: movies
    };
  }
  movies[index].likes++;

  return {
    ...result,
    liked: [...state.liked, id],
    movies: movies
  };
};

const dislikes = (state, id) => {
  const { liked, disliked, movies } = state;
  const index = movies.findIndex(obj => obj.id === id);
  let result = state;
  if (liked.indexOf(id) !== -1) {
    movies[index].likes--;
    result = {
      ...state,
      liked: liked.filter(e => e !== id)
    };
  }

  if (disliked.indexOf(id) !== -1) {
    movies[index].dislikes--;
    return {
      ...state,
      disliked: liked.filter(e => e !== id),
      movies: movies
    };
  }
  movies[index].dislikes++;

  return {
    ...result,
    disliked: [...state.liked, id],
    movies: movies
  };
};
const ELEMENTSBYPAGE = (state, e) => {
  const value = parseInt(e);
  return {
    ...state,
    elementsNumberByPage: value,
    page: 0,
    ...pagination(state, value, 0)
  };
};

const pagination = (state, value, page) => {
  const { filteredMovies } = state;
  return {
    moviesToDispaly: filteredMovies.slice(0 + page * value, (1 + page) * value)
  };
};

const changePage = (state, value) => {
  const { page, filteredMovies, elementsNumberByPage } = state;
  const newpage = page + value;

  if (filteredMovies.length / elementsNumberByPage > newpage && newpage >= 0)
    return {
      ...state,
      page: newpage,
      ...pagination(state, elementsNumberByPage, newpage)
    };
  return { ...state };
};
