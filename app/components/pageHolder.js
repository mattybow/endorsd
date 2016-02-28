import React, { Component } from 'react';
import {TransitionMotion, spring} from 'react-motion';
import shouldPureComponentUpdate from 'react-pure-render/function';
import {colors} from '../styles/inlineConstants';

const {lavendar} = colors

export default class PageHolder extends Component{
  shouldComponentUpdate(props,state){
    return !(props.path === this.props.path);
  };
  willEnter(){
    return {x:-30, opacity: 0};
  }
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {x:spring(60, {stiffness: 120, damping: 14}), opacity: spring(0, {stiffness: 270, damping: 30})};
  }
  getStyles(){
    return [{
      key:this.props.pageName,
      data:{
        text:this.props.pageName
      },
      style:{
        opacity:1,
        x:spring(0)
      }
    }];
  }
  render(){
    console.log('render PageHolder');
    return <div className="page-holder">
      <div className="page-info">
        <div className="mobile-only left-side"
          style={{
            minWidth:30
          }}>
          <div className="icon-wm10-back icon-lg icon-naked icon-flush-left"></div>
        </div>
        <div className="style-bar desktop-only"
          style={{
            width:50,
            height:10,
            backgroundColor:lavendar
          }}>
        </div>
        <TransitionMotion willEnter={this.willEnter}
                          willLeave={this.willLeave}
                          styles={this.getStyles()}>
          {interpolatedStyles =>{
            //console.log(interpolatedStyles);
            return <div className="flex-child-expand" style={{
                position:'relative',
                height:'1em',
                width:100
              }}>
              {interpolatedStyles.map(({key, style, data:{text}}) => {
                const { x, opacity } = style;
                return <div key={key} className="page-title"
                            style={{
                              opacity:opacity,
                              transform:`translateY(${x}px)` }}>
                        {text}
                      </div>
              })}
            </div>
          }}
        </TransitionMotion>
        <div className="mobile-only" style={{
            width:40
          }}>
        </div>
      </div>
      <div className="page-content-holder">
        <div className="page-contents">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}
