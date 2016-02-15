import React, { Component } from 'react';
import { closeSnackbar } from '../actions/snackbarActions';
import { connect } from 'react-redux';
import cx from 'classnames';
import '../styles/snackbar.scss';

function selectSnackbar(state){
  return {...state.snackbarData};
}

class SnackBar extends Component{
  handleRequestClose(){
    this.props.dispatch(closeSnackbar());
  }
  componentDidUpdate(){
    if(this.props.open){
      setTimeout(::this.handleRequestClose, this.props.duration);
    }
  }
  render(){
    const {open, mode, msg} = this.props
    const snackbarClasses = cx("snackbar-container",
    { open: open,
      error: mode !== 'SUCCESS'
    })
    return <div className={snackbarClasses}>
      <div className="snackbar-content flex-parent-row">
        <div className="snackbar-msg">{msg}</div>
        <div className="flex-child-expand" style={{textAlign:'right'}}>
          <button className="snackbar-action no-border"
                  onClick={ev => {
              this.handleRequestClose();
            }}>
            dismiss
          </button>
        </div>
      </div>
    </div>
  }
}

export default connect(selectSnackbar)(SnackBar);
