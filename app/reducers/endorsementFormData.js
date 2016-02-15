import { UPDATE_ENDORSEMENT_FORM,
         ADD_ENDORSER,
         ADD_COPY_OF_ENDORSER,
         ADD_EMPTY_ENDORSER,
         ADD_EMPTY_ENDORSER_WITH_NAME,
         UPDATE_ENDORSER,
         REMOVE_ENDORSER,
         UPDATE_ENDORSER_TAGS,
         CLEAR_ENDORSEMENT_FORM } from '../constants/endorsementFormTypes';
import moment from 'moment';

function newIdByDateTime(){
  return new Date().valueOf().toString();
}

function makeEmptyEndorser(){
  return {
    name:null,
    descript: null,
    wikiLink: null,
    isOrg: false,
    id:newIdByDateTime(),
    avatar:null,
    isNew:true,
    tags:[]
  }
}

function getInitialState(){
  return {
    selectedCandidate:'',
    endorsers:[],
    source:null,
    date: moment(new Date()).format('YYYY-MM-DD')
  }
}

export default function endorsementFormData(state=getInitialState(), action){
  switch(action.type){
    case UPDATE_ENDORSEMENT_FORM:
      return {...state, ...action.data};
    case ADD_ENDORSER:
      return {...state,
      ...{endorsers:[
        action.data,
        ...state.endorsers
      ]}};
    case ADD_COPY_OF_ENDORSER:
      console.log(action);
      const endorsersWithCopy = state.endorsers.reduce((acc,endorsement) => {
        if (endorsement.id === action.id){
          acc.push({...endorsement, ...{
            id:newIdByDateTime(),
            NAME:`Copy of ${endorsement.name}`
          }});
        }
        acc.push(endorsement);
        return acc;
      },[]);
      console.log(endorsersWithCopy);
      return {...state, ...{endorsers:endorsersWithCopy}};
    case ADD_EMPTY_ENDORSER:
      const { endorsers } = state;
      const newEndorsers = [makeEmptyEndorser(),...endorsers];
      return {...state, ...{endorsers:newEndorsers} };
    case ADD_EMPTY_ENDORSER_WITH_NAME:
      return {...state, ...{endorsers:[{...makeEmptyEndorser(),...{name:action.name}},...state.endorsers]} };
    case UPDATE_ENDORSER:
      const { id, data } = action;
      const updatedEndorsers = state.endorsers.map(endorser =>
        endorser.id === id ?
          {...endorser, ...data} :
          endorser
        );
      return {...state, ...{endorsers:updatedEndorsers}};
    case REMOVE_ENDORSER:
      return {...state, ...{endorsers:state.endorsers.filter( endorser => endorser.id !== action.id )}};
    case UPDATE_ENDORSER_TAGS:
      const {tag, selected} = action;
      console.log('ADD SELECTED TAG',tag)
      if(selected){
        return {...state, selectedTags:[...state.selectedTags, {...tag, isSelected:selected}]}
      } else {
        return {...state, selectedTags: state.selectedTags.filter( selectedTag => tag.id !== selectedTag.id)};
      }
    case CLEAR_ENDORSEMENT_FORM:
      return getInitialState();
    default:
      return state;
  }
}
