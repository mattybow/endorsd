import React from 'react';
import EndorserInput from './endorserInput';
import Avatar from './avatar';
import { colors } from '../styles/inlineConstants';
import moment from 'moment';

const {barney} = colors;

var EditEndorserForm = (props) => {
  return <div className="form-contents">
    <div className="flex-parent-row"
        style={{
          margin:'20px 0 30px'
        }}>
      <Avatar url={props.avatar}/>
      <div className="flex-child-expand"
            style={{
                marginLeft:30
              }}>
        <div>{props.name}</div>
        <div
          style={{
              fontSize:'.8em',
              color:barney
            }}>updated {moment(new Date(props.modified)).fromNow()}</div>
      </div>
      <button className="btn-default flex-child-start desktop-only">
        <span>delete endorser</span>
      </button>
    </div>
    <EndorserInput {...props}
      inputChangeHandler={props.changeHandler}/>
  </div>
}

export default EditEndorserForm;
