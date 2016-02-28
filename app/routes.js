import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import EndorsementsPage from './components/endorsementsPage';
import CandidatesPage from './components/candidatesPage';
import EndorsersPage from './components/endorsersPage';
import CandidateDetails from './components/candidateDetails';

class PlaceHolderComp extends React.Component {
  render(){
    return <div>place holder</div>
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EndorsementsPage}/>
    <Route path="endorsements"
           component={EndorsementsPage}
           onEnter={(nextState, replace) => {
             console.log(nextState);
           }}>
      <Route path="candidate/:name" component={CandidateDetails} />
      <Route path="endorser/:name" component={PlaceHolderComp} />
    </Route>
    <Route path="candidates" component={CandidatesPage}>
      <Route path="candidate/:name" component={CandidateDetails} />
    </Route>
    <Route path="endorsers" component={EndorsersPage}/>
  </Route>
);
