import { REQUEST_CANDIDATES, RECEIVE_CANDIDATES, ADD_CANDIDATE } from '../constants/candidateTypes';

export default function candidates(state=[], action){
  switch (action.type){
    case RECEIVE_CANDIDATES:
      return action.data;
    case ADD_CANDIDATE:
      return [action.candidate, ...state];
    default:
      return state;
  }
}
