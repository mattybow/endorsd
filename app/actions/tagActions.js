import { REQUEST_TAGS, RECEIVE_TAGS, ADD_TAG, RECEIVE_ENDORSERS_BY_TAGS } from '../constants/tagTypes';
import * as api from './api';

export function getTags(){
  return (dispatch, getState) => {
    dispatch(requestTags());
    api.getTags().then(
      data => {
        dispatch(receiveTags(data.data));
      },
      err => {
        console.log('err on tag request', err);
      }
    );
  }
}


export function getEndorsersByTags(){
  return (dispatch, getState) => {
    return api.getEndorsersByTags().then(
      data => {
        dispatch(receiveEndorsersByTags(data.data))
      },
      err => {
        console.log('err getting endorsers by tag', err)
      }
    )
  }
}

export function getCommonEndorserTags(){
  return (dispatch, getState) => {
    return api.getCommonEndorserTags().then(
      data => {
        dispatch(receiveEndorsersByTags(data.data))
      },
      err => {
        console.log('err getting endorsers by tag', err)
      }
    )
  }
}

function receiveEndorsersByTags(data){
  return {
    type:RECEIVE_ENDORSERS_BY_TAGS,
    data
  }
}

function makeTagId(){
  return "T" + new Date().valueOf();
}

export function deleteTag(id){
  return {
    type: DELETE_TAG,
    id
  }
}

function requestTags(){
  return {
    type: REQUEST_TAGS
  }
}

function receiveTags(data){
  return {
    type: RECEIVE_TAGS,
    data
  }
}
