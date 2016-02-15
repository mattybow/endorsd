import React, { Component } from 'react';
import AutoCompleteSelector from './autoCompleteSelector';
import { getTags, addTag } from '../actions/tagActions';
import { connect } from 'react-redux';
import { colors } from '../styles/inlineConstants';

const {grey} = colors;

function selectData(state,props){
  const { tags } = state;
  return { tags };
}

class TagSelection extends Component{
  componentWillMount(){
    this.props.dispatch(getTags());
  }
  enterHandler= (newValue) => {
    const newTag = addTag(newValue);
    this.props.dispatch(newTag);
    this.handleSelection(newTag.tag);
  }
  handleSelection = (choice) => {
    //check if it is already selected
    if(this.props.selectedData.find(selectedRecord => selectedRecord.id === choice.id)){
      null;
    } else {
      //if not already selected, pass request
      this.props.handleSelection(choice)
    }
  }
  renderNoChoices(term){
    return <div className="new-choice-tag">
      <div>new tag: <span className='tag-choice'>{term}</span></div>
    </div>;
  }
  renderChoice = (choice) => {
    return <div className="tag-choice"
         key={choice.id}
         onClick={ev => {
           ev.stopPropagation();
           this.handleSelection(choice);
         }}>
      {choice.value}
    </div>;
  }
  render(){
    return <AutoCompleteSelector inputPlaceholder="Search for Tag"
                                 renderChoice={this.renderChoice}
                                 renderNoChoices={this.renderNoChoices}
                                 closeOnSelect={false}
                                 onEnter={this.enterHandler}
                                 selectionHandler={this.handleSelection}
                                 selected={this.props.selectedData}
                                 choices={this.props.tags}
                                 containerClass="flex-parent-row wrap tags-container"/>;
  }
}

export default connect(selectData)(TagSelection);
