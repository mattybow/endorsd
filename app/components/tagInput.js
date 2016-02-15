import React, { Component } from 'react';
import cx from 'classnames';
import AutoCompleteDropdown from './autoCompleteDropdown';
import { getTags, addTag } from '../actions/tagActions';
import { connect } from 'react-redux';
import "../styles/autoComplete.scss";

const ENTER_KEY = 13;

function selectData(state, props){
  const { tags } = state;
  const augmentedTags = tags.map( tag => {
    const exists = props.selectedTags.find( selectedTag => selectedTag.id === tag.id );
    let isSelected = false;
    if(exists){
      isSelected = true;
    }
    return {...tag, isSelected:isSelected};
  });
  return {tags:augmentedTags};
}

class TagInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:'',
      showChoices:false,
      duplicateTag:false
    }
  }
  isDuplicateTag(tagName){
    const lowercaseTagName = tagName.toLowerCase();
    return this.props.tags.find( tag => tag.value === lowercaseTagName );
  }
  setDuplicateTag(isDupe){
    this.setState({duplicateTag:isDupe});
  }
  handleTagInputChange(term){
    this.setState({searchTerm:term,
                   duplicateTag:false});
  }
  handleClearClick(){
    this.setState({searchTerm:''});
  }
  handleTagEnter(ev){
    const newTag = ev.target.value;
    if(ev.which === ENTER_KEY && newTag){
      const duplicateTag = this.isDuplicateTag(newTag);
      if(duplicateTag){
        this.props.selectionHandler(duplicateTag,true);
      } else {
        const addTagAction = addTag(newTag);
        this.props.dispatch(addTagAction);
        this.props.selectionHandler(addTagAction.tag,true);
      }
      ev.target.select();
    }
  }
  handleAutoCompCloseClick = () => {
    this.setState({showChoices:false});
  }
  componentWillMount(){
    this.props.dispatch(getTags());
  }
  renderAutoComplete(){
    return <AutoCompleteDropdown choices={this.props.tags}
                                 filter={this.state.searchTerm}
                                 closeClickHandler = {this.handleAutoCompCloseClick}
                                 selectionClickHandler={this.props.selectionHandler}/>;
  }
  renderSelectedTags(){
    return this.props.selectedTags.map( tag => <div key={tag.id}
                                                    className="flex-parent-row tag-choice selected"
                                                    onClick={() => {
                                                      this.props.selectionHandler(tag, !tag.isSelected);
                                                    }}>
          <span>{tag.value}</span>
          <span className="icon-close"></span>
        </div>
      );
  }
  render(){
    const {searchTerm, showChoices, duplicateTag} = this.state;
    const closeIconClasses = cx("btn-naked", "no-border", "icon-close", "fader", {faded: !searchTerm});
    const dupeClasses = cx("input-error-message", {show:duplicateTag});
    const autoCompleteClasses = cx("auto-complete-container", {open: showChoices});
    return <div style={{position:'relative'}}>
      <div className="search-input-holder" style={{position:'relative'}}>
        <button className={closeIconClasses}
             style={{
                      position:'absolute',
                      right:0,
                      top:'0.8em'
                    }}
             onClick = {()=> {this.handleClearClick()}}>
        </button>

        <input type="text"
               style={{paddingRight:'1em'}}
               placeholder="Search for tag"
               value={searchTerm}
               onFocus={ev => {
                 this.setState({showChoices:true})
               }}
               onKeyPress={ev => {
                 this.handleTagEnter(ev);
               }}
               onChange={ev => {
                 this.handleTagInputChange(ev.target.value);
               }}/>
         <div className={dupeClasses}>
           this tag already exists
         </div>

        <div className={autoCompleteClasses}
              style={{position:'absolute',
                 top:'3em',
                 left:0,
                 width:'100%'
               }}>
           { showChoices ? this.renderAutoComplete() : ''}
         </div>
         <div className="selected-tags flex-parent-row wrap"
              style={{
                margin:'0 -.2em'
              }}>
           {this.renderSelectedTags()}
         </div>
      </div>
    </div>;
  }
}

export default connect(selectData)(TagInput)
