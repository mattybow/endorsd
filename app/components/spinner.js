import React, { Component } from 'react';
import '../styles/spinner.scss';

export default class Spinner extends Component{
  render(){
    return <div className="loader" style={{width:20}}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none"  stroke-miterlimit="10"/>
      </svg>
    </div>;
  }
}
