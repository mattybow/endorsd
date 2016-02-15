import { REQUEST_CANDIDATES, RECEIVE_CANDIDATES, ADD_CANDIDATE } from '../constants/candidateTypes';
import * as api from './api';

export function fetchCandidatesIfNeeded(){
  return (dispatch, getState) => {
    if(!getState().candidates.length){
      api.getCandidates().then(
        data => {
          dispatch(receiveCandidates(data.data));
        },
        () => {
          console.log('RECEIVE CANDIDATES FAIL');
        }
      )
    }
  }
}

export function refetchCandidates(){
  return (dispatch, getState) => {
    api.getCandidates().then(
      data => {
        dispatch(receiveCandidates(data.data));
      },
      () => {
        console.log('RECEIVE CANDIDATES FAIL');
      }
    )
  }
}

function requestCandidates(){
  return {
    type: REQUEST_CANDIDATES
  }
}

function receiveCandidates(data){
  return {
    type: RECEIVE_CANDIDATES,
    data
  }
}

export function addCandidate(candidate){
  return {
    type: ADD_CANDIDATE,
    candidate
  }
}
