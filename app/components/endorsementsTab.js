import React, { Component } from 'react';
import FormContainer from './formContainer';
import ModalWrapper from './modalWrapper';
import EndorsementList from './endorsementList';
import SearchBox from './searchBox';
import PageHolder from './pageHolder';
import { connect } from 'react-redux';
import { getEndorsements, saveEndorsementEdits } from '../actions/endorsementActions';
import { saveEndorsement, clearEndorsementForm } from '../actions/endorsementFormActions';


function selectData(state,props){
  return {
    endorsements:state.endorsements
  }
}

class EndorsementsTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  componentWillMount(){
    this.props.dispatch(getEndorsements());
  }
  applySearch = (term) => {
    this.setState({searchTerm:term})
  };
  getEndorsementById(id){
    return this.props.endorsements.find(
      endorsement => endorsement.id === id
    )
  }
  render(){
    return <PageHolder pageName="Endorsements">
      <div style={{
          paddingTop:80
        }}>
        <SearchBox placeholderText="Search"
                   onChangeHandler={this.applySearch}/>
        <EndorsementList endorsements={this.props.endorsements}
                          />
      </div>

    </PageHolder>;
  }
}

export default connect(selectData)(EndorsementsTab);
