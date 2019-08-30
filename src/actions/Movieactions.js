import { GET_DATA, TASK_DONE, Display, DELETE_MOVIE } from "./types";
import { movies$ } from "../movies";

export const getData = () => dispatch => {
  movies$
    .then(data =>
      dispatch({
        type: GET_DATA,
        payload: data
      })
    )
    .catch(err => console.log(err));
};

export const _handerDelete = id => dispatch => {
  dispatch({
    type: DELETE_MOVIE,
    payload: id
  });
};
