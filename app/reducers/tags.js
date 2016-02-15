import { REQUEST_TAGS, RECEIVE_TAGS, ADD_TAG, DELETE_TAG } from '../constants/tagTypes';

export default function tags(state=[],action){
  switch(action.type){
    case ADD_TAG:
      return [action.tag,...state];
    case DELETE_TAG:
      return state.filter(tag => tag.id !== action.id);
    case RECEIVE_TAGS:
      return action.data;
    default:
      return state;
  }
}
