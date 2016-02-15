import React from 'react';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

const RadioGroup = (props) => {
  const { name, value, changeHandler, choices, style } = props;
  return <RadioButtonGroup name={name}
                    valueSelected={value}
                    onChange= {changeHandler}>
    {choices.map(choice => {
      const { value, label } = choice
      return <RadioButton value={value}
                          label={label}
                          style={style}
                          labelStyle={{fontFamily:'Source Code Pro'}}
                          iconStyle={{fill:'#A06CD5'}}
                          key={value}/>
                      })}
  </RadioButtonGroup>
}

export default RadioGroup;
