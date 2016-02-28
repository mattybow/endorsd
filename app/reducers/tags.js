import { REQUEST_TAGS, RECEIVE_TAGS, ADD_TAG, DELETE_TAG, RECEIVE_ENDORSERS_BY_TAGS } from '../constants/tagTypes';

export default function tags(state=[],action){
  switch(action.type){
    case ADD_TAG:
      return [action.tag,...state];
    case RECEIVE_ENDORSERS_BY_TAGS:
      //collate data
      return action.data.reduce( (acc,endorser) => {
        const existingEntry = acc.find( ({tagDescript}) => tagDescript === endorser.tagDescript);
        if(existingEntry){
          existingEntry.endorsers.push(endorser);
        } else {
          acc.push({
            tagDescript: endorser.tagDescript,
            endorsers:[endorser]
          });
        }
        return acc;
      },[]);
    case RECEIVE_TAGS:
      return action.data;
    default:
      return state;
  }
}
