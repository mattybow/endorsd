import React, { Component } from 'react';
import '../styles/nav.scss';

export default class TopBar extends Component{
  render(){
    return <div style={{
        position:'fixed',
        bottom:100,
        left:70
      }}>
      <nav>
        <div>
          <div className="nav-link">endorsements</div>
          <div className="nav-link">candidates</div>
          <div className="nav-link">endorsers</div>
        </div>
      </nav>
    </div>;
  }
}
