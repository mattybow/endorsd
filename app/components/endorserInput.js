import React, { Component } from 'react';
import CheckBox from './checkBox';
import TextInputField from './textInputField';
import TagSelection from './tagSelection';
import shouldPureComponentUpdate from 'react-pure-render/function';

class EndorserInput extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  renderSelectedTags(endorserId, tags){
    return tags.map( tag => {
      console.log(tag);
      const { id, value } = tag;
      return <div key={id}
        className="flex-parent-row tag-choice selected"
        onClick={() => {
          const newTags = tags.filter(tag => tag.id !== id);
          this.props.inputChangeHandler(endorserId, {tags:newTags});
        }}>
        <span>{tag.value}</span>
        <span className="icon-close"></span>
      </div>
    });
  }
  render(){
    const { id, name, descript, wikiLink, avatar, isOrg, tags, inputChangeHandler, copyHandler, removeHandler } = this.props;
    console.log(`render ${id} input`);
    return <div className="input-group">
      <TextInputField label='Name'
                      value = {name}
                      id={id}
                      changeHandler = {ev => {
                        inputChangeHandler(id,{name:ev.target.value})
                      }}/>
      <TextInputField label='Description'
                      value = {descript}
                      id={id}
                      changeHandler = {ev => {
                        inputChangeHandler(id,{descript:ev.target.value})
                      }}/>
      <TextInputField label='Wikipedia'
                      value = {wikiLink}
                      id={id}
                      changeHandler = {ev => {
                        inputChangeHandler(id,{wikiLink:ev.target.value})
                      }}/>
      <TextInputField label='Avatar'
                      value = {avatar}
                      id={id}
                      changeHandler = {ev => {
                        inputChangeHandler(id,{avatar:ev.target.value})
                      }}/>
                    <div>Tags</div>
      <TagSelection selectedData={tags}
                    handleSelection= { choice => {
                      console.log(choice);
                      inputChangeHandler(id, {tags:[choice, ...tags]});
                    }}/>
      <div className="flex-parent-row wrap">
        {this.renderSelectedTags(id, tags)}
      </div>
      <div className="flex-parent-row" style={{
          margin:'1em 0'
        }}>
       <div className="flex-child-expand">
         <CheckBox label="is organization"
                   checked={isOrg}
                   changeHandler={ () => {
                     inputChangeHandler(id, {isOrg:!isOrg});
                   }}/>
       </div>
       {copyHandler ? <button className="btn-default no-border"
               onClick={ () => {
                 copyHandler(id);
               }}>
         <span className="icon-blank icon-lg icon-naked icon-btn-form"></span>
       </button> : ''}

       {removeHandler ? <button className="btn-default no-border btn-naked"
               onClick={ () => {
                 removeHandler(id);
               }}>
         <span className="icon-trash-bin icon-lg icon-naked icon-btn-form"></span>
       </button> : ''}
      </div>
    </div>
  }
}

export default EndorserInput;
