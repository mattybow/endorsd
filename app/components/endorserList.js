import React, { Component } from 'react';
import Avatar from './avatar';
import '../styles/endorserList.scss'

export default class EndorserList extends Component{
  renderEndorsers(){
    return this.props.endorsers.filter(
      endorser => endorser.name.match(new RegExp(`${this.props.filter}`,'i')) ? true : false
    ).map(endorser => (
      <div className="flex-parent-row list-item-spacing" key={endorser.id}>
        <Avatar url={endorser.avatar}/>
        <div style={{borderBottom:'1px solid #E7E7EC', marginLeft:20, padding:'20px 0'}} className="flex-parent-row flex-child-expand">
          <div className="flex-child-expand endorser-list-info">
            <div>{endorser.name}</div>
            <div style={{
                width:'100%',
                fontSize:'.8em',
                whiteSpace:'nowrap',
                textOverflow:'ellipsis',
                overflow:'hidden'
              }}>{endorser.descript}</div>
            <div className="desktop-only"
                 style={{
                  marginTop:5
                 }}>{endorser.tags.map(tag => {
                return <span className="endorser-list-tag"
                             key={tag.id}>
                          {tag.value}
                       </span>;
              })}</div>
          </div>
          <button className="btn-default no-border" onClick={() => {
              this.props.editClickHandler(endorser.id);
            }}>
            edit
          </button>
        </div>
      </div>
    ));
  }
  render(){
    const endorsers = this.renderEndorsers();
    return <div>
      {endorsers.length ? endorsers : <div>no matching endorsers</div>}
    </div>;
  }
}
