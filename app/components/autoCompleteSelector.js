import React, { Component } from 'react';
import cx from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { compose } from 'redux';
import Spinner from './spinner';
import '../styles/autoComplete.scss';

const ENTER_KEY = 13;
const DOWN_KEY = 40;
const UP_KEY = 38;
const ESC_KEY = 27;

class AutoCompleteDropdown extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  componentDidMount(){
    document.body.addEventListener('keydown', this.closeOnEsc, false);
  }
  componentWillUnmount(){
    document.body.removeEventListener('keydown', this.closeOnEsc, false);
  }
  closeOnEsc = (ev) => {
    if(ev.which === ESC_KEY){
      this.props.closeClickHandler();
      ev.target.blur();
    }
  };
  callClose = (ev) => {
    ev.preventDefault();
    //ev.stopPropagation();
    this.props.closeClickHandler();
  };
  renderChoices(){
    const renderedChoices = this.props.choices.map((choice, index)=> {
      const tagClasses = cx("dropdown-choice", {selected:choice.isSelected}, {highlighted:choice.isHighlighted});
      return <div className={tagClasses}
           key={choice.id}
           onMouseEnter={() => {
             this.props.mouseEnterHandler(index);
           }}
           onClick={ev => {
             console.log('click');
             ev.stopPropagation();
             this.props.selectionClickHandler(choice);
           }}>
        { this.props.renderChoice(choice) }
      </div>
    });
    return renderedChoices;
  }
  render(){
    return <div className="dropdown-container">
        <div className={this.props.containerClass}>
          {this.renderChoices()}
        </div>
    </div>;
  }
}


export default class AutoCompleteSelector extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:'',
      showChoices:false,
      highlightedIndex:0,
    }
  }
  isDuplicateTag(tagName){
    const lowercaseTagName = tagName.toLowerCase();
    return this.props.tags.find( tag => tag.value === lowercaseTagName );
  }
  handleInputChange(term){
    this.setState({searchTerm:term});
    this.props.inputChangeHandler(term);
    if(!term){
      this.props.clearHandler();
    }
  }
  handleClearClick(){
    this.setState({searchTerm:''});
    this.props.clearHandler();
  }
  handleSpecialKeys(ev){
    switch (ev.which) {
      case ENTER_KEY:
        const newValue = ev.target.value;
        const { onEnter, closeOnSelect } = this.props;
        const selectedChoice = this.getFilteredChoices().find( choice => choice.isHighlighted );

        this.props.selectionHandler(selectedChoice, this.state.searchTerm);
        if(closeOnSelect){
          ev.target.blur();
          this.handleAutoCompCloseClick();
        }
        if(!selectedChoice.isDefault){
          this.setState({searchTerm:selectedChoice.value});
        }
        break;
      case DOWN_KEY:
        ev.preventDefault();
        this.handleUpDownKey(DOWN_KEY);
        break;
      case UP_KEY:
        ev.preventDefault();
        this.handleUpDownKey(UP_KEY);
        break;
    }

      // const duplicateTag = this.isDuplicateTag(newTag);
      // if(duplicateTag){
      //   this.props.selectionHandler(duplicateTag,true);
      // } else {
      //   this.props.createNew();
      //   // const addTagAction = addTag(newTag);
      //   // this.props.dispatch(addTagAction);
      //   // this.props.selectionHandler(addTagAction.tag,true);
      // }
      // ev.target.select();
  }
  // resetHighlightedIndex(){
  //   this.setState({highlightedIndex:0});
  // }

  handleUpDownKey(whichKey){
    const index = this.state.highlightedIndex;

    switch(whichKey){
      case DOWN_KEY:
        this.setHighlightedIndex(index + 1);
        break;
      case UP_KEY:
        this.setHighlightedIndex(index - 1);
        break;
    }

  }
  handleSelectionClick = (choice) => {
    console.log('click', this.state);
    const {selectionHandler, closeOnSelect} = this.props;
    selectionHandler && selectionHandler(choice, this.state.searchTerm);
    if(closeOnSelect){
      this.handleAutoCompCloseClick();
    }
    console.log(choice);
    if(!choice.isDefault){
      console.log(choice.value);
      this.setState({searchTerm:choice.value});
    }
  };
  handleAutoCompCloseClick = () => {
    this.setState({showChoices:false});
  };
  setHighlightedIndex = (index) => {
    this.setState({highlightedIndex:index});
  };
  getIndex(rawIndex, limit){
    if(rawIndex < 0){
      const subtractor = -1 * rawIndex % limit;
      //weirdness with zero based index
      return !subtractor ? 0 : limit - subtractor;
    } else if (rawIndex > 0 ){
      return rawIndex % limit;
    } else if ( rawIndex === 0 ){
      return rawIndex
    }
  };
  getFilteredChoices(){
    const choices = [
      {text:'show all results',
      id:'0000',
      isDefault:true},
      ...this.props.choices
    ]

    const highlightedIndex = this.getIndex(this.state.highlightedIndex,choices.length);

    return choices.map((choice,index) => (
      {...choice, isHighlighted: index === highlightedIndex}
    )).map(choice => {
      const isSelected = this.props.selected.find( selection => selection.id === choice.id);
      return {...choice, isSelected:isSelected ? true : false}
    });

  }
  renderAutoComplete(){
    return <AutoCompleteDropdown closeClickHandler = {this.handleAutoCompCloseClick}
                                 {...this.props}
                                 enteredText={this.state.searchTerm}
                                 choices={this.getFilteredChoices()}
                                 mouseEnterHandler={this.setHighlightedIndex}
                                 selectionClickHandler= {this.handleSelectionClick}/>;
  }
  render(){
    const {searchTerm, showChoices, duplicateTag} = this.state;
    const closeIconClasses = cx("btn-naked", "no-border", "icon-close", "fader", {faded: !searchTerm});
    const autoCompleteClasses = cx("auto-complete-container", {open: showChoices});
    return <div style={{position:'relative',
    width:'100%'}}>
      {showChoices && searchTerm ? <div className="close-click-receiver"
           onClick={this.handleAutoCompCloseClick}>
      </div> : ''}

      <div className="search-input-holder" style={{position:'relative'}}>
        <button className={closeIconClasses}
             style={{
                      position:'absolute',
                      right:12,
                      top:'0.8em'
                    }}
             onClick = {()=> {this.handleClearClick()}}>
        </button>
        <div className={this.props.isLoading ? 'delay-in' : ''}
            style={{
              position:'absolute',
              right:30,
              top:'0.8em',
              visibility: this.props.isLoading ? 'visible' : 'hidden'
            }}>
          <Spinner />
        </div>

        <input type="text"
               style={{paddingRight:'1em'}}
               placeholder={this.props.placeholderText}
               value={searchTerm}
               onFocus={ev => {
                 ev.target.select();
                 this.setState({showChoices:true});
               }}
               onKeyDown={ev => {
                 console.log('hi')
                 this.handleSpecialKeys(ev);
               }}
               onChange={ev => {
                 this.handleInputChange(ev.target.value);
               }}/>

        <div className={autoCompleteClasses}
              style={{position:'absolute',
                 top:'3em',
                 left:0,
                 width:'100%'
               }}>
           { showChoices && searchTerm ? this.renderAutoComplete() : ''}
         </div>
      </div>
    </div>;
  }
}
