import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';
//action Creator
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors};
}

//thunk is to return a dispatch function
export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

