import React, { Component } from 'react';
import FormControls from './formControls';

export default class FormContainer extends Component{
  render(){
    return <div className="form-container">
      <div className="desktop-only">
        <h2>{this.props.formName}</h2>
        <hr/>
      </div>
      <div className="mobile-only flex-parent-row flex-row-center" style={{
          height:'3em',
          borderBottom:'1px solid #e0e0e0',
          position:'absolute',
          width:'100%',
          pointerEvents:'none',
          backgroundColor:'#fff'
        }}>
        <h4 style={{
               textAlign:'center',
               margin:'10px 0'
             }}>{this.props.formName}</h4>
      </div>
      <FormControls {...this.props}/>
      {this.props.children}
    </div>;
  }
}
