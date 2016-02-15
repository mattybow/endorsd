import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import EndorsementsTab from './components/endorsementsTab';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EndorsementsTab}/>
  </Route>
);
