import {  REQUEST_SEARCH_TERMS,
          RECEIVE_SEARCH_TERM_RESULTS,
          REQUEST_SEARCH_TERM_FAILED,
          REQUEST_SEARCH,
          REQUEST_SEARCH_FAILED,
          RECEIVE_SEARCH_RESULTS,
          CLEAR_SEARCH_RESULTS} from '../constants/endorsementTypes';

const initialState = {
  searchResults:[],
  searchResultsLoading:false,
  searchTermResults:[],
  searchTermResultsLoading:false
}

export default function searchResults(state=initialState, action){
  switch(action.type){
    case REQUEST_SEARCH:
      return {...state, searchResultsLoading:true}
    case RECEIVE_SEARCH_RESULTS:
      return {...state, searchResults:action.data}
    case CLEAR_SEARCH_RESULTS:
      return {...state, searchResults:[]}
    case REQUEST_SEARCH_TERMS:
      return {...state, searchTermResultsLoading:true}
    case RECEIVE_SEARCH_TERM_RESULTS:
      return {...state, searchTermResults:action.data, searchTermResultsLoading:false};
    default:
      return state;
  }
}
