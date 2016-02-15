import React, { Component } from 'react'
import TopBar from './topBar';
import NavBar from './navBar';
import Snackbar from './snackbar';
import '../styles/normalize.css';
import '../styles/main.scss';

export default class App extends Component{
  render(){
    const touchCapable = 'ontouchstart' in window ? 'touch' : '';
    return <div className={touchCapable}>
      <TopBar />

      <div id="tab-contents">
        {this.props.children}
      </div>
      <Snackbar duration={3000}/>
    </div>;
  }
}
