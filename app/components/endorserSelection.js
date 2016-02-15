import React, { Component } from 'react';
import AutoCompleteSelector from './autoCompleteSelector';
import Avatar from './avatar';
import { connect } from 'react-redux';
import { getEndorsersIfNeeded } from '../actions/endorserActions';
import { colors } from '../styles/inlineConstants';

const {grey} = colors;

function selectData(state,props){
  const { endorsers } = state;
  return { endorsers };
}

class EndorserSelection extends Component{
  componentWillMount(){
    this.props.dispatch(getEndorsersIfNeeded())
  }
  handleSelection = (choice) => {
    //check if it is a duplicate
    if(this.props.selectedData.find(selectedRecord => selectedRecord.id === choice.id)){
      null;
    } else {
      this.props.handleSelection(this.props.endorsers.find( endorser =>
      endorser.id === choice.id ))
    }
  }
  renderNoChoices(term){
    return <div className="endorser-choice"
                style={{
                  padding:'1em'
                }}>
      <div className="flex-parent-row">
        <span className="icon-plus icon-md"></span>
        {term}
      </div>
    </div>;
  }
  renderChoice(choice){
    return <div className="flex-parent-row endorser-choice"
                style={{
                  padding:'0 1em'
                }}>
      <Avatar size={30}
              url={choice.avatar}/>
            <div className="flex-child-expand endorser-choice-name">
              {choice.value}
            </div>
    </div>;
  }
  render(){
    return <AutoCompleteSelector inputPlaceholder="Search for Endorser"
                                 renderChoice={this.renderChoice}
                                 renderNoChoices={this.renderNoChoices}
                                 closeOnSelect={true}
                                 onEnter={this.props.onEnterHandler}
                                 selectionHandler={this.handleSelection}
                                 selected={this.props.selectedData}
                                 choices={this.props.endorsers.map(endorser => ({
                                   value:endorser.name,
                                   id:endorser.id,
                                   avatar:endorser.avatar
                                 }))}/>;
  }
}

export default connect(selectData)(EndorserSelection)
