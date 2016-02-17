import { RECEIVE_SEARCH_TERM_RESULTS } from '../constants/endorsementTypes';

const initialState = {
  searchResults:[],
  searchTermResults:[]
}

export default function searchResults(state=initialState, action){
  switch(action.type){
    case RECEIVE_SEARCH_TERM_RESULTS:
      return {...state, searchTermResults:action.data};
    default:
      return state;
  }
}
