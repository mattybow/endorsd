import axios from 'axios';

export function dummy(){
  return axios.get('');
}

export function getTweets(){
  return axios.get('/api/tweets');
}

export function deleteTweet(id){
  return axios.post('/api/deleteTweet', {
    id
  });
}

export function getSearchTerms(term){
  return axios.post('/api/terms',{term});
}

export function getSearchResults(choice){
  return axios.post('/api/search',{...choice});
}

export function getEndorsersByTags(){
  return axios.get('/api/endorsersByTag');
}

export function getCommonEndorserTags(){
  return axios.get('/api/endorsers?tags=T1453761705692&tags=T1453245283798&tags=T1453331304790&tags=T1453330985272')
}

export function addCandidate(data){
  return axios.post('/api/addCandidate',data);
}

export function addEndorsements(data){
  return axios.post('/api/addEndorsements',data);
}

export function saveEndorsementEdits(data){
  return axios.post('/api/updateEndorsement',data);
}

export function saveEndorserEdits(data){
  return axios.post('/api/updateEndorser',data);
}

export function saveCandidateEdits(data){
  return axios.post('/api/updateCandidate',data);
}


export function checkAuth(){
  return axios.post('/auth/check');
}

export function getCandidates(){
  return axios.get('/api/candidates');
}

export function getEndorsements(){
  return axios.get('/api/endorsements');
}

export function getEndorsers(){
  return axios.get('/api/endorsers');
}

export function getTags(){
  return axios.get('/api/tags');
}

export function getCandidateInfo(id){
  return axios.get('/api/candidate');
}
