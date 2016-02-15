import React, { Component } from 'react';
import createHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';
import routes from '../routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import { createDevTools } from 'redux-devtools';

import * as reducers from '../reducers';

//const DevTools = createDevTools();
const history = createHistory();
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore); //wrap store with middleware
const store = createStoreWithMiddleware(combineReducers(reducers));

export default class Root extends Component{
  render(){
    return <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>;
  }
}
