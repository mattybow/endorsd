import { RECEIVE_ENDORSEMENTS,
         REQUEST_SEARCH_TERMS,
         RECEIVE_SEARCH_TERM_RESULTS,
         REQUEST_SEARCH_TERM_FAILED,
         REQUEST_SEARCH,
         REQUEST_SEARCH_FAILED,
         RECEIVE_SEARCH_RESULTS,
         CLEAR_SEARCH_RESULTS } from '../constants/endorsementTypes';
import { openSnackbar } from './snackbarActions';
import * as api from './api';

export function getEndorsements(){
  return (dispatch,getState) => {
    api.getEndorsements().then(
      data => {
        dispatch(receiveEndorsements(data.data));
      },
      console.log
    )
  }
}

function receiveEndorsements(data){
  return {
    type: RECEIVE_ENDORSEMENTS,
    data
  }
}


export function searchTerms(term){
  return (dispatch, getState) => {
    dispatch(requestSearchTerms())
    api.getSearchTerms(term).then(
      data => {
        dispatch(receiveSearchTermResults(data.data))
      },
      err => {
        dispatch(requestSearchTermFail(err))
      }
    )
  }
}

function requestSearchTerms(){
  return {
    type:REQUEST_SEARCH_TERMS
  }
}

function requestSearchTermFail(err){
  return {
    type:REQUEST_SEARCH_TERM_FAILED,
    err
  }
}

function receiveSearchTermResults(data){
  return {
    type: RECEIVE_SEARCH_TERM_RESULTS,
    data
  }
}

export function executeSearch(data){
  return (dispatch, getState) => {
    dispatch(requestSearchResults());
    api.getSearchResults(data).then(
      data => {
        dispatch(receiveSearchResults(data.data))
      },
      err => {
        dispatch(requestSearchResultsFailed())
      }
    )
  }
}

export function clearSearchResults(){
  return {
    type:CLEAR_SEARCH_RESULTS
  }
}

function requestSearchResults(){
  return {
    type:REQUEST_SEARCH
  }
}

function receiveSearchResults(data){
  return{
    type:RECEIVE_SEARCH_RESULTS,
    data
  }
}

function requestSearchResultsFailed(){
  return {
    type:REQUEST_SEARCH_FAILED,
    err: 'request for search term failed'
  }
}
