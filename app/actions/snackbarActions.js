import { SNACKBAR_OPEN, SNACKBAR_CLOSE } from '../constants/snackbarTypes';

export function openSnackbar(mode, msg){
  return {
    type:SNACKBAR_OPEN,
    msg,
    mode
  }
}

export function closeSnackbar(){
  return {
    type:SNACKBAR_CLOSE
  }
}
