import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import EndorsementsPage from './components/endorsementsPage';
import CandidatesPage from './components/candidatesPage';
import EndorsersPage from './components/endorsersPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EndorsementsPage}/>
    <Route path="endorsements"
           component={EndorsementsPage}
           onEnter={(nextState, replace) => {
             console.log(nextState);
           }}/>
    <Route path="candidates" component={CandidatesPage}/>
    <Route path="endorsers" component={EndorsersPage}/>
  </Route>
);
