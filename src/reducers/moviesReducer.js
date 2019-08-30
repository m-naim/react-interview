import { DELETE_MOVIE, GET_DATA } from "../actions/types";

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
        movies: action.payload
      };
    case DELETE_MOVIE:
      return {
        ...state,
        tasks: state.tasks.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}
