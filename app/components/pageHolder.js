import React, { Component } from 'react';
import {TransitionMotion, spring} from 'react-motion';
import {colors} from '../styles/inlineConstants';

const {lavendar} = colors

export default class PageHolder extends Component{
  willEnter(){
    return {x:spring(-10), opacity: spring(0)};
  }
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {x:spring(10), opacity: spring(0)};
  }
  getStyles(){
    return [{
      key:this.props.pageName,
      style:{
        opacity:1,
        x:0
      }
    }];
  }
  render(){
    console.log(this.getStyles());
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
        <TransitionMotion willEnter={this.willEnter}
                          willLeave={this.willLeave}
                          styles={this.getStyles()}>
          {interpolatedStyles =>
            <div style={{
                position:'relative'
              }}>
              {interpolatedStyles.map(config => {
                const { x, opacity } = config.style;
                return <div key={config.key}
                            style={{
                              opacity:opacity,
                              fontSize:'2em',
                              fontFamily:'Ubuntu',
                              margin: '20 0',
                              position:'absolute',
                              transform:`translateY(${x}px)` }}>
                        {config.key}
                      </div>
              })}
            </div>
          }
        </TransitionMotion>
      </div>
      <div className="page-content-holder">
        {this.props.children}
      </div>
    </div>;
  }
}
