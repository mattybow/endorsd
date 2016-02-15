import React, { Component } from 'react';

export default class CandidateList extends Component{
  renderCandidates(){
    const { candidates, editClickHandler } = this.props;
    return candidates.map( candidate => {
      const { firstName, lastName, avatar, id } = candidate;
      return <div className="flex-parent-row list-item-spacing" key={id}>
          <div>
            <img src={avatar} alt="" style={{maxWidth:60}}/>
          </div>
          <div style={{borderBottom:'1px solid #E7E7EC', marginLeft:20, padding:'20px 0'}} className="flex-parent-row flex-child-expand">
            <div className="flex-child-expand">
              <span>{firstName}&nbsp;</span>
              <span>{lastName}</span>
            </div>
            <button className="btn-default no-border"
                    onClick={() => {
                      editClickHandler(id);
                    }}>
              edit
            </button>
          </div>
        </div>;
    });
  }
  render(){
    return <div>
      { this.renderCandidates() }
    </div>;
  }
}
