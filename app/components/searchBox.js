import React, { Component } from 'react';
import AutoCompleteSelector from './autoCompleteSelector';
import "../styles/searchBox.scss";

export default class SearchBox extends Component{
  constructor(props){
    super(props)
    this.state={
      term:''
    }
  }
  renderChoice(choice){
    return <div>{choice.value}</div>;
  }
  renderNoChoices(){
    return <div>nothing found</div>;
  }
  handleSelection(){
    console.log('handle selection');
  }
  render(){
    return <div className="search-box flex-parent-row"
      style={{
        padding:"0 5%"
      }}>
      <AutoCompleteSelector inputPlaceholder="Search"
                                   renderChoice={this.renderChoice}
                                   renderNoChoices={this.renderNoChoices}
                                   closeOnSelect={true}
                                   selected={[]}
                                   selectionHandler={this.handleSelection}
                                   choices={[
                                     {value:'asdf',id:1},
                                     {value:'qewr',id:2},
                                     {value:'zxzxcv',id:3},
                                   ]}/>
      <div className="icon-filter icon-lg icon-flush-right"></div>
    </div>;
  }
}
