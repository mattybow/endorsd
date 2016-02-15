import React, { Component } from 'react';
import cx from 'classnames';
import '../styles/modal.scss';

export default class ModalWrapper extends Component{
  componentDidUpdate(){
    document.body.style.overflow = this.props.isOpen ? 'hidden' : '';
  }
  render(){
    const { isOpen } = this.props;
    const contentClassNames = cx("modal-content-container", {open:isOpen});
    return <div style={{
        position:'fixed',
        top:0,
        left:0,
        right:0,
        backgroundColor:'rgba(255,255,255,.95)',
        bottom:0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: isOpen ? 'none' : 'visibility 140ms',
        WebkitTransition: isOpen ? 'none' : 'visibility 140ms',
        overflow:'auto'
      }} className="modal-wrapper">
      <div className={contentClassNames} style={{
          maxWidth:600,
          margin:'auto'
        }}>
        {this.props.children}
      </div>
    </div>;
  }
}
