import React, { Component } from 'react';
import {colors} from '../styles/inlineConstants';

const {lavendar} = colors

export default class PageHolder extends Component{
  render(){
    return <div>
      <div className="page-title"
        style={{
          position:'fixed',
          top:80,
          left:70
        }}>
        <div className="style-bar"
          style={{
            width:50,
            height:10,
            backgroundColor:lavendar
          }}>
        </div>
        <div style={{
            fontSize:'2em',
            fontFamily:'Ubuntu',
            margin: '20 0'
          }}>{this.props.pageName}
        </div>
      </div>
      <div className="page-content"
        style={{
          marginLeft:'30%'
        }}>
        {this.props.children}
      </div>
    </div>;
  }
}
