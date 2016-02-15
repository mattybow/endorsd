import { SET_LOGIN_INFO, INVALID_AUTH }from '../constants/loginTypes';

const initialState = {};

export default function loginInfo(state=initialState, action){
  switch(action.type){
    case SET_LOGIN_INFO:
      return action.loginInfo;
    case INVALID_AUTH:
      return initialState;
    default:
      return state;
  }
}
