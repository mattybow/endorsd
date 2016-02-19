import React, { Component } from 'react'
import TopBar from './topBar';
import NavBar from './navBar';
import Snackbar from './snackbar';
import PageHolder from './pageHolder';
import '../styles/normalize.css';
import '../styles/main.scss';

export default class App extends Component{
  pathToPageName(path){
    switch(path.match(/(\/)(\w*)/)[2]){
      case 'endorsements':
        return "Endorsements";
      case 'candidates':
        return 'Candidates';
      case 'endorsers':
        return 'Endorsers';
    }
    return 'Hmmmm';
  }
  render(){
    const touchCapable = 'ontouchstart' in window ? 'touch' : '';
    return <div className={touchCapable}>
      <TopBar path={this.props.location.pathname}/>
      <PageHolder pageName={this.pathToPageName(this.props.location.pathname)}>
        {this.props.children}
      </PageHolder>
      <Snackbar duration={3000}/>
    </div>;
  }
}
