import React from 'react';
import { colors } from '../styles/inlineConstants';

const {barney} = colors;
var CheckBox = (props) => {
  const { uncheckedLabel, label, checked, labelLeft, changeHandler } = props;
  const labelText = uncheckedLabel ?
                      checked ? label : uncheckedLabel :
                      label;
  const $label = <div>{labelText}</div>;
  const checkbox = <div className="box flex-parent-row flex-row-center"
       style={{
         marginLeft:labelLeft ? 10 : 0,
         marginRight: labelLeft ? 0 : 10,
         width:30,
         height:30,
         borderWidth:1,
         borderStyle:'solid',
         borderColor: checked ? barney :  'rgba(0,0,0,.3)'
       }}
       onClick={ changeHandler }>
       {checked ? <span className="icon-check-mark"
         style={{
           color: checked ? barney :  'inherit'
         }}></span> : ''}
  </div>

  if(labelLeft){
    return <div className="flex-parent-row">
      {$label}
      {checkbox}
    </div>
  }
  return <div className="flex-parent-row">
    {checkbox}
    {$label}
  </div>

}
export default CheckBox;
