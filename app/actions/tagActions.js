import { REQUEST_TAGS, RECEIVE_TAGS, ADD_TAG, DELETE_TAG } from '../constants/tagTypes';
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

export function addTag(value){
  return {
    type: ADD_TAG,
    tag : {
      id:makeTagId(),
      value,
      isNew:true
    }
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
