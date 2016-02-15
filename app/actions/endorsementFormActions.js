import { UPDATE_ENDORSEMENT_FORM,
         ADD_ENDORSER,
         ADD_EMPTY_ENDORSER,
         ADD_EMPTY_ENDORSER_WITH_NAME,
         ADD_COPY_OF_ENDORSER,
         UPDATE_ENDORSER,
         REMOVE_ENDORSER,
         UPDATE_ENDORSER_TAGS,
         REQUEST_SAVE_ENDORSEMENT,
         CLEAR_ENDORSEMENT_FORM } from '../constants/endorsementFormTypes';
import * as api from './api';
import { openSnackbar } from './snackbarActions';
import { getTags } from './tagActions';
import { getEndorsements } from './endorsementActions';


export function addCopyOfEndorser(id){
  return {
    type:ADD_COPY_OF_ENDORSER,
    id
  }
}

export function updateEndorsementForm(data){
  return {
    type:UPDATE_ENDORSEMENT_FORM,
    data
  };
}

export function updateEndorserTags(tag,selected){
  return {
    type:UPDATE_ENDORSER_TAGS,
    tag,
    selected
  }
}

export function updateEndorser(id, data){
  return {
    type:UPDATE_ENDORSER,
    id,
    data
  }
}

export function clearEndorsementForm(){
  return {
    type:CLEAR_ENDORSEMENT_FORM
  }
}

export function removeEndorser(id){
  return {
    type:REMOVE_ENDORSER,
    id
  }
}

export function addEndorser(data){
  return {
    type:ADD_ENDORSER,
    data
  };
}

export function addEmptyEndorser(){
  return {
    type:ADD_EMPTY_ENDORSER
  };
}

export function addEmptyEndorserWithName(name){
  return {
    type:ADD_EMPTY_ENDORSER_WITH_NAME,
    name
  }
}

export function saveEndorsement(){
  return (dispatch,getState) => {
    const {endorsementFormData, tags} = getState();
    const validation = checkEndorsementData(endorsementFormData);
    if(validation.ok){
      dispatch(requestSaveEndorsement());
      const newTags = tags.filter(tag => tag.isNew) || [];
      api.addEndorsements({...endorsementFormData, newTags}).then(
        reply => {
          dispatch(openSnackbar('SUCCESS', 'Endorsements Added'));
          dispatch(clearEndorsementForm());
          //refresh tags, clears isNew flags
          //todo: only refresh if there is a newly added tag
          dispatch(getTags());
          dispatch(getEndorsements());
        },
        err => {
          console.log(err);
        }
      );
    } else {
      dispatch(openSnackbar('PREVENTED', validation.msg));
    }

  }
}

function checkEndorsementData(data){
  const ok = false;
  const hasCandidate = data.selectedCandidate;
  if(!hasCandidate){
    return {ok,
      msg:'needs a candidate'
    };
  }
  const hasEndorsers = data.endorsers.length;
  if(!hasEndorsers){
    return {ok,
      msg:'needs an endorser'
    };
  }
  let endorserNameNull;
  if(hasEndorsers){
    endorserNameNull = data.endorsers.find( endorser => endorser.name === null );
    if(endorserNameNull){
      return {ok,
        msg:'an endorser needs a name'
      }
    }
  }
  return {
    ok:true
  }
}

function requestSaveEndorsement(){
  return {
    type:REQUEST_SAVE_ENDORSEMENT
  }
}
