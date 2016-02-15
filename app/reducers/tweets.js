import { RECEIVE_TWEETS, DELETE_TWEET } from '../constants/tweetTypes.js';

const initialState=[];

export default function tweets(state=initialState, action){
  switch(action.type){
    case RECEIVE_TWEETS:
      return action.data;
    case DELETE_TWEET:
      return state.filter( data => (action.id !== data._id) );
    default:
      return state;
  }
}
