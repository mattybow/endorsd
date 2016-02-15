import React, { Component } from 'react';
import FastClick from 'fastclick';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import Root from './components/root.js';

window.addEventListener('load', () => {
  FastClick.attach(document.body);
  injectTapEventPlugin();
});
render(<Root />, document.getElementById('root'));
