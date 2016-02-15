import { SET_LOGIN_INFO,
         REUQEST_CHECK_AUTH,
         INVALID_AUTH } from '../constants/loginTypes';
import * as api from './api';

export function setLoginInfo(loginInfo){
  return {
    type:SET_LOGIN_INFO,
    loginInfo
  }
}

function requestCheckAuth(){
  return {
    type:REUQEST_CHECK_AUTH
  }
}

function invalidateAuth(){
  return {
    type:INVALID_AUTH
  }
}

export function checkAuth(){
  return (dispatch, getState) => {
    dispatch(requestCheckAuth());
    api.checkAuth().then(
      null,
      () => {
        dispatch(invalidateAuth());
      }
    )
  }
}
