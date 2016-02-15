import { RECEIVE_ENDORSERS } from '../constants/endorserTypes';

export default function endorsers(state=[],action){
  switch(action.type){
    case RECEIVE_ENDORSERS:
      return action.data.map(endorser => {
        const tagNames = endorser.tags.split(',');
        return {
        ...endorser,
        ...{tags:endorser.tagIds.split(',')
                             .map((tagId,index) => ({
                               id:tagId,
                               value:tagNames[index]
                             }))}
        }
      });
    default:
      return state;
  }
}
