import React from 'react';
import '../styles/loadingIndicator.css';

var LoadingIndicator = (props) => {
  return <div style={{textAlign:'center', padding: '1em 0'}}>
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>
    loading...
  </div>
}

export default LoadingIndicator;
