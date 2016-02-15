import React, { Component } from 'react';
import { connect } from 'react-redux';
import EndorserList from './endorserList';
import FormContainer from './formContainer';
import EditEndorserForm from './editEndorserForm';
import ModalWrapper from './modalWrapper';
import { getEndorsersIfNeeded, saveEndorserEdits } from '../actions/endorserActions';
import {isListSame} from '../util';

function selectData(state,props){
  const {endorsers} = state;
  return {endorsers};
}

function getObjectDiff(original, copy){
  return Object.keys(copy).reduce((acc,key) => {
    const origVal = original[key];
    const copyVal = copy[key];
    if(Array.isArray(copyVal)){
      if(!isListSame(origVal, copyVal)){
        acc[key] = copyVal;
      }
    } else if (typeof copyVal === 'object'){
      alert('object comparison');
    } else {
      if(origVal !== copyVal){
        acc[key] = copyVal;
      }
    }
    return acc;
  },{})
}

class EndorserTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:'',
      formOpen:false
    }
  }
  componentWillMount(){
    this.props.dispatch(getEndorsersIfNeeded());
  }
  searchInputChangeHandler = (term) => {
    this.setState({searchTerm:term});
  }
  openEditForm = (id) => {
    this.setState({
      formOpen:true,
      formName: 'Edit Endorser',
      formData: this.getEndorserById(id) || {}
    });
  }
  getEndorserById(id){
    return this.props.endorsers.find(
      endorser => endorser.id === id
    )
  }
  updateEditForm = (id, data) => {
    this.setState({ formData:{
      ...this.state.formData,
      ...data
    }});
  }

  closeForm = () => {
    this.setState({formOpen:false});
  }
  saveEdits = () => {
    const {id} = this.state.formData;
    const original = this.getEndorserById(id);
    const diffs = getObjectDiff(original, this.state.formData);
    if (Object.keys(diffs).length){
      this.props.dispatch(saveEndorserEdits({...diffs, id})).then(
        () => {
          this.closeForm();
        }
      );
    } else {
      console.log('nothing to save');
    }
  }
  renderForm(){
    return <FormContainer closeHandler={this.closeForm}
                   saveHandler = {this.saveEdits}
                   formName={this.state.formName}>
      <EditEndorserForm {...this.state.formData}
            changeHandler={this.updateEditForm}/>
    </FormContainer>
  }
  render(){
    return <div>
      <div className="flex-parent-row"
           style={{
             position:'relative'
           }}>
        <input type="text"
               placeholder="Search"
               value={this.state.searchTerm}
               onChange={ ev => {
                 this.searchInputChangeHandler(ev.target.value);
               }}
               className="input-center"
               style={{
                 paddingLeft:'3em',
                 paddingRight:'3em'
               }}/>
             <div className="icon-search icon-lg"
                    style={{
                      position:'absolute',
                      left:0,
                      top:3,
                      color:'#e0e0e0'
                    }}></div>
      </div>
      <EndorserList {...this.props}
                    filter={this.state.searchTerm}
                    editClickHandler={this.openEditForm}/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? this.renderForm() : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectData)(EndorserTab);
