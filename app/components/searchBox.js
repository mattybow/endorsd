import React, { Component } from 'react';
import AutoCompleteSelector from './autoCompleteSelector';
import Avatar from './avatar';
import { connect } from 'react-redux';
import { searchTerms, executeSearch } from '../actions/endorsementActions';
import "../styles/searchBox.scss";
import {colors} from '../styles/inlineConstants';

const {grey, periwinkle} = colors;

function selectData(state,props){
  const { searchResults:{searchTermResults} } = state;
  return { searchTermResults };
}

class SearchBox extends Component{
  constructor(props){
    super(props)
    this.state={
      term:''
    }
  }
  renderChoice(choice){
    if(choice.isDefault){
      return <div className="search-result-sugg flex-parent-row">
        <div className="flex-child-expand">{choice.text}</div>
        <div className="icon-arrow"></div>
      </div>
    }
    return <div className="search-result-sugg flex-parent-row">
      <Avatar size={30}
              url={choice.avatar}/>
      <div style={{
          margin: '0 0 0 1em'
        }}>
        <div>{choice.value}</div>
        <div style={{
            fontSize:'.7em',
            color:grey
          }}>{choice.type}</div>
      </div>
    </div>;
  }
  renderNoChoices(){
    return <div>nothing found</div>;
  }
  handleSelection = (choice, searchTerm)=>{
    console.log('handle selection')
    if(choice.isDefault){
      choice.term = searchTerm;
      choice.type = 'search';
    }
    this.props.dispatch(executeSearch(choice));
  };
  inputChangeHandler = (term) => {
    this.props.dispatch(searchTerms(term))
  };
  render(){
    return <AutoCompleteSelector
              placeholderText="Search"
              renderChoice={this.renderChoice}
              renderNoChoices={this.renderNoChoices}
              closeOnSelect={true}
              selected={[]}
              choices={this.props.searchTermResults}
              selectionHandler={this.handleSelection}
              inputChangeHandler = {this.inputChangeHandler}
              {...this.props}/>
  }
}

export default connect(selectData)(SearchBox);
