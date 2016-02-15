import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import CandidateList from './candidateList';
import AddButton from './addButton';
import ModalWrapper from './modalWrapper';
import AddCandidateForm from './addCandidateForm';
import FormContainer from './formContainer';
import { requestAddCandidate, updateCandidateForm, resetCandidateForm, saveCandidateEdits } from '../actions/candidateFormActions';

function selectCandidates(state){
  const { candidates } = state;
  return { candidates };
}

class CandidateTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      formOpen: false
    }
  }
  openEditForm = (id) => {
    this.props.dispatch(updateCandidateForm(this.props.candidates.find(
      candidate => candidate.id === id
    )));
    this.setState({
      formOpen:true,
      formName:'Edit Candidate'
    })
  }
  openAddForm = () => {
    this.props.dispatch(resetCandidateForm());
    this.setState({
      formOpen:true,
      formName:'Add Candidate'
    });
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  saveEdits = () => {
    this.props.dispatch(saveCandidateEdits()).then(
      ok => {
        if(ok) this.closeForm();
      }
    );
    console.log('save edits');
  }
  saveAddForm = () => {
    console.log('save form');
    this.props.dispatch(requestAddCandidate());
  }
  componentWillMount(){
    this.props.dispatch(fetchCandidatesIfNeeded());
  }
  renderForm(){
    const isAddForm = this.state.formName === 'Add Candidate';
    return isAddForm ?
    <FormContainer closeHandler={this.closeForm}
                   saveHandler = {this.saveAddForm}
                   clearHandler = {this.clearForm}
                   formName={this.state.formName}>
      <AddCandidateForm />
    </FormContainer> :
    <FormContainer closeHandler={this.closeForm}
                   saveHandler = {this.saveEdits}
                   formName={this.state.formName}>
      <AddCandidateForm isEditMode={true}/>
    </FormContainer>
  }
  render(){
    return <div>
      <AddButton clickHandler={this.openAddForm}
                 buttonText = 'Add Candidate'/>
      <CandidateList candidates={this.props.candidates}
                     editClickHandler={this.openEditForm}/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? this.renderForm() : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectCandidates)(CandidateTab);
