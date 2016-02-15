import React, { PropTypes } from 'react';

const FormControls = (props) => {

  return <div style={{
      zIndex:1
    }}>
    <div className="form-controls mobile-only flex-parent-row"
         style={{
           height:'3em',
           marginBottom:'1em',
           position:'relative',
           zIndex:1
         }}>
      <button className="no-border btn-naked flex-child-expand"
              style={{
                paddingLeft:9,
                verticalAlign:'middle',
                textAlign:'left'
              }}
              onClick={props.closeHandler}>
        <span className="icon-arrow back"></span>
        <span>back</span>
      </button>
      <button className="no-border btn-naked flex-child-expand"
              style={{
                textAlign:'right',
                paddingRight:20
              }}
              onClick={props.saveHandler}>
        <div>save</div>
      </button>
    </div>
    <div className="form-controls desktop-only" style={{position:'absolute', right:'-4em', top:0}}>
      <div className="icon-check-mark icon-lg pointer" style={{marginBottom:'.5em'}} onClick={props.saveHandler}></div>
      { props.clearHandler ?
        <div className="icon-empty-blank icon-lg pointer"
             style={{marginBottom:'.5em'}}
             onClick={props.clearHandler}></div>
           : '' }
      <div className="icon-close icon-lg pointer" onClick={props.closeHandler}></div>
    </div>
  </div>

}

FormControls.propTypes = {
  closeHandler:PropTypes.func.isRequired,
  saveHandler:PropTypes.func.isRequired
}

export default FormControls
