import {
  GET_DATA,
  DELETE_MOVIE,
  TOGEL_FILTER,
  TOGEL_LIKES,
  TOGEL_DISLIKES,
  HANDLE_ELEMENTSBYPAGE,
  HANDLE_CHANGEPAGE
} from "./types";
import { movies$ } from "../movies";

export const getData = () => dispatch => {
  console.log("getdata");
  movies$
    .then(data => {
      console.log(data);
      dispatch({
        type: GET_DATA,
        payload: data
      });
    })
    .catch(err => console.log(err));
};

export const _handelDelete = id => dispatch => {
  console.log("delete");
  dispatch({
    type: DELETE_MOVIE,
    payload: id
  });
};

export const _togeleFilter = category => dispatch => {
  dispatch({
    type: TOGEL_FILTER,
    payload: category
  });
};

export const _togleDislike = id => dispatch => {
  dispatch({
    type: TOGEL_DISLIKES,
    payload: id
  });
};
export const _togleLike = id => dispatch => {
  dispatch({
    type: TOGEL_LIKES,
    payload: id
  });
};

export const _handleMoviePerPageValue = val => dispatch => {
  dispatch({
    type: HANDLE_ELEMENTSBYPAGE,
    payload: val
  });
};

export const _handleChangePage = val => dispatch => {
  dispatch({
    type: HANDLE_CHANGEPAGE,
    payload: val
  });
};
