import { SNACKBAR_OPEN, SNACKBAR_CLOSE } from '../constants/snackbarTypes';

const initialState = {
  msg:null,
  open:false,
  mode:'SUCCESS'
}

export default function snackbarData(state=initialState, action){
  const { msg, mode } = action;
  let style = 'SUCCESS';
  switch(action.type){
    case SNACKBAR_OPEN:
      return {
        msg,
        open:true,
        mode
      }
    case SNACKBAR_CLOSE:
      return {...state, ...{open:false}}
    default:
      return state;
  }
}
