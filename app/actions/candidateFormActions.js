import { UPDATE_CANDIDATE,
         RECEIVE_CANDIDATE_DATA,
         REQUEST_CANDIDATE_ADD,
         REQUEST_CANDIDATE_EDIT,
         RESET_CANDIDATE_FORM } from '../constants/candidateFormTypes';
import { openSnackbar } from './snackbarActions';
import { addCandidate, refetchCandidates } from './candidateActions';
import * as api from './api';

export function updateCandidateForm(data){
  return {
    type:UPDATE_CANDIDATE,
    data
  }
}

export function resetCandidateForm(){
  return {
    type:RESET_CANDIDATE_FORM
  }
}

export function requestAddCandidate(data){
  return (dispatch, getState) => {
    const { candidateFormData } = getState();
    api.addCandidate(candidateFormData).then(
      ()=>{
        //add the candidate clientside
        dispatch(addCandidate(candidateFormData));
        //indicate that the persistance was successful
        dispatch(openSnackbar('SUCCESS', 'Candidate Created'));
        dispatch(resetCandidateForm());
      },
      ()=>{
        dispatch(openSnackbar('FAILURE', 'Server Error'));
      }
    )
  }
}

function requestCandidateAdd(){
  return {
    type:REQUEST_CANDIDATE_ADD
  }
}

export function saveCandidateEdits(){
  return (dispatch,getState) => {
    const { candidateFormData, candidates } = getState();
    const prevCandidateData = candidates.find(candidate => candidate.id === candidateFormData.id);
    const diffs = Object.keys(candidateFormData).reduce((acc,key) => {
      if(candidateFormData[key] !== prevCandidateData[key]){
        acc[key] = candidateFormData[key];
      }
      return acc;
    }, {});
    if(Object.keys(diffs).length){
      dispatch(requestSaveCandidate());
      return api.saveCandidateEdits({...diffs, id:candidateFormData.id}).then(
        () =>{
          dispatch(refetchCandidates());
          dispatch(openSnackbar('SUCCESS', 'Candidate Edited'));
          return true;
        },
        () => {
          dispatch(openSnackbar('FAILURE', 'Server Error'));
        }
      );
    }
    return api.dummy();
  }
}

function requestSaveCandidate(){
  return {
    type: REQUEST_CANDIDATE_EDIT
  }
}
