import { RECEIVE_ENDORSEMENTS } from '../constants/endorsementTypes';

export default function endorsements(state=[],action){
  switch(action.type){
    case RECEIVE_ENDORSEMENTS:
      return action.data
    default:
      return state;
  }
}
