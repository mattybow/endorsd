import { UPDATE_CANDIDATE,
         RECEIVE_CANDIDATE_DATA,
         REQUEST_CANDIDATE_ADD,
         REQUEST_CANDIDATE_EDIT,
         RESET_CANDIDATE_FORM } from '../constants/candidateFormTypes';

const initialState = {
  avatar: null,
  id: null,
  dob: null,
  firstName: null,
  gender: 'M',
  lastName: null,
  middleName: null,
  party: 'R',
  active: true
}

export default function candidateFormData(state=initialState,action){
  switch(action.type){
    case UPDATE_CANDIDATE:
      return {...state,...action.data};
    case RESET_CANDIDATE_FORM:
      return initialState;
    default:
      return state;
  }
}
