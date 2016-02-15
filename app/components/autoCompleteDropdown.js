import React, { Component } from 'react';
import cx from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';

const ESC_KEY = 27;

export default class AutoCompleteDropdown extends Component{
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
  }
  callClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.closeClickHandler();
  }
  renderChoices(){
    console.log(this.props.choices);
    let regExFilter='';
    const { filter, choices } = this.props;
    switch(filter.length){
      case 0:
        break;
      case 1:
        regExFilter = `^${filter}`;
        break;
      default:
        regExFilter = `${filter}`;
    }
    return choices.filter( tag => {
      return tag.value.match(new RegExp(regExFilter, 'i')) ? true : false;
    }).map(choice => {
      const tagClasses = cx("dropdown-choice", "tag-choice", {selected:choice.isSelected})
      return <div className={tagClasses}
           key={choice.value}
           onClick={ev => {
             ev.stopPropagation();
             this.props.selectionClickHandler(choice, !choice.isSelected);
           }}>
        {choice.value}
      </div>
    }

    );
  }
  render(){
    return <div className="dropdown-container"
                onClick={this.callClose}
                onKeyPress={ev=>{
                  console.log(ev);
                }}>
        <button className="btn-default btn-naked no-border"
                style={{
                  position:'absolute',
                  right: '-3em',
                  top: 0
                }}
                onClick={this.callClose}>
          <span className="icon-close icon-lg"></span>
        </button>
        <div className="esc-hint" style={{
            fontSize:'.8em',
            margin:'0 .2em 1em'
          }}>
          <span style={{
              backgroundColor:'rgba(0,0,0,0.2)',
              borderRadius:2,
              marginRight:'.5em',
              padding:'1px 4px'
            }}>esc</span>
          <span>to close</span>
        </div>
        <div className="flex-parent-row wrap">
          {this.renderChoices()}
        </div>

    </div>;
  }
}
