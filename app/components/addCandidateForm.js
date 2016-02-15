import React, {Component} from 'react';
import TextInputField from './textInputField';
import CheckBox from './checkBox';
import { connect } from 'react-redux';
import RadioGroup from './radioGroup';
import { updateCandidateForm } from '../actions/candidateFormActions';
import { convertDate } from '../util';


function selectCandidateFormData(state){
  const { candidateFormData } = state;
  return { formData: candidateFormData };
}

const PARTY_CHOICES=[
  { value: 'D',
    label: 'Democrat' },
  { value: 'R',
    label: 'Republican' }
];

const GENDER_CHOICES=[
  { value: 'M',
    label: 'Male' },
  { value: 'F',
    label: 'Female' }
]

class AddCandidateForm extends Component{
  inputChangeHandler(data){
    this.props.dispatch(updateCandidateForm(data));
  }
  render(){
    const { formData: {id, firstName, middleName, lastName, dob, gender, party, avatar, active}, isEditMode } = this.props;
    return <div className="form-contents">
      <TextInputField label='FEC Id'
                      value = {id}
                      id={id}
                      changeHandler = {ev => {
                        if(!isEditMode){
                          this.inputChangeHandler({id:ev.target.value})
                        }
                      }}
                      {...this.props}/>
      <TextInputField label='First Name'
                      value = {firstName}
                      id={id}
                      changeHandler = {ev => {
                        this.inputChangeHandler({firstName:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Middle Name'
                      value = {middleName}
                      id={id}
                      changeHandler = {ev => {
                        this.inputChangeHandler({middleName:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Last Name'
                      value = {lastName}
                      id={id}
                      changeHandler = {ev => {
                        this.inputChangeHandler({lastName:ev.target.value})
                      }}
                      {...this.props}/>
      <div className="input-field">
        <label className="non-mui">Party</label>
        <RadioGroup name="party"
                    value={party}
                    changeHandler = {ev => {
                      this.inputChangeHandler({party:ev.target.value})
                    }}
                    choices = {PARTY_CHOICES}
                    style={{marginBottom:'.5em', width:'50%', display:'inline-block', height:'1em'}}/>
      </div>
      <div className="input-field">
        <label className="non-mui">Gender</label>
        <RadioGroup name="gender"
                    value={gender}
                    changeHandler = {ev => {
                      this.inputChangeHandler({gender:ev.target.value})
                    }}
                    choices = {GENDER_CHOICES}
                    style={{marginBottom:'.5em', width:'50%', display:'inline-block', height:'1em'}}/>
      </div>
      <TextInputField label='Birthdate'
                      placeholder="YYYY-MM-DD"
                      value={convertDate(dob)}
                      id={id}
                      changeHandler = {ev => {
                        this.inputChangeHandler({dob:ev.target.value})
                      }}
                      {...this.props}/>

      <TextInputField label='Avatar Link'
                      value={avatar}
                      id={id}
                      changeHandler = {ev => {
                        this.inputChangeHandler({avatar:ev.target.value})
                      }}
                      {...this.props}/>
      <CheckBox label="active"
                uncheckedLabel = "not active"
                checked={active}
                changeHandler={ () => {
                  this.inputChangeHandler({active:!active});
                }}/>
    </div>
  }
}

export default connect(selectCandidateFormData)(AddCandidateForm)
