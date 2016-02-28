import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from './avatar';
import { getEndorsements } from '../actions/endorsementActions';
import { getCommonEndorserTags } from '../actions/tagActions';
import '../styles/endorsersPage.scss';

function selectState(state,props){
  const { endorsements, tags } = state;
  return {
    endorsements: endorsements.slice(0,10),
    tags
  }
}

class AvatarWithHoverBubble extends Component{
  render(){

  }
}

class EndorsersPage extends Component{
  componentWillMount(){
    this.props.dispatch(getEndorsements());
    this.props.dispatch(getCommonEndorserTags());
  }
  renderCandidateGroups(){
    const groups = this.props.endorsements.reduce( (acc, next) => {
      const {candidateName} = next;
      if(candidateName in acc){
        acc[candidateName].endorsers.push(next);
      } else {
        acc[candidateName] = {};
        acc[candidateName].endorsers = [next];
        acc[candidateName].canAvatar = next.canAvatar;
      }
      return acc;
    }, {});

    return Object.keys(groups).map( candidate => {
      const group = groups[candidate];
      return <div key={candidate} className="flex-parent-row start candidate-group" style={{margin:'1em 0'}}>
        <div>
          <img src={group.canAvatar} style={{width:60}} alt=""/>
        </div>
        <div className="flex-child-expand candidate-group-endorser-info">
          <div>
            <span><Link to="/endorsements">{candidate} </Link></span>
            <span>received endorsements from</span>
          </div>
          <div style={{ width:50, backgroundColor:'rgba(255,255,255,.1)', height:1, marginTop:'.5em'}}></div>
          <div className="flex-parent-row wrap" style={{marginTop:'.5em'}}>
            {group.endorsers.map(endorser => <div className="flex-parent-row" style={{margin:'0 10 10 0'}} key={endorser.id}>
              <Avatar url={endorser.endAvatar}
                      size={30}
                      key={endorser.id}/>
              <span
                   style={{fontSize:'.8em', margin:'0 10 0 5'}}>
                {endorser.endorser}
             </span>
            </div>)}
          </div>
        </div>

      </div>
    })
  }
  renderTags(){
    return this.props.tags.map(tag => <div className="flex-parent-row" key={tag.tagDescript} style={{marginBottom:'.5em'}}>
      <Link to="/endorsements">
        <div className="flex-parent-row">
          <div>{tag.tagDescript}</div>
          <div style={{
              width:'1em',
              height:'1em',
              borderRadius:'1em',
              overflow:'hidden',
              padding:'.5em',
              fontSize:'.8em',
              backgroundColor:'rgba(0,0,0,0.3)',
              marginLeft:'.5em'
            }} className="flex-parent-row flex-row-center">
            <span>{tag.endorsers.length}</span>
          </div>
        </div>
      </Link>
      <div className="flex-child-expand flex-parent-row flex-row-end">
        {tag.endorsers.slice(0,5).map((endorser, index) => <div style={{margin:'0 0 0 10'}} key={endorser.endId}>
          <Avatar url={endorser.avatar} size={30}/>
        </div>)}
      </div>
    </div>)
  }
  render(){
    console.log(this.props);
    return <div id="endorser-page-content">
      <div style={{marginBottom:'1em',
                  borderBottom:"1px solid rgba(255,255,255,.1)",
                  padding:'.5em 1em'}}
          className="flex-parent-row">
          <span style={{fontSize:'1.2em'}} className="flex-child-expand">Recently Added</span>
          <Link to="/endorsements">see all</Link>
      </div>
      <div style={{padding:'0 .5em'}}>
        {this.renderCandidateGroups()}
      </div>
      <div style={{marginBottom:'1em',
                  borderBottom:"1px solid rgba(255,255,255,.1)",
                  padding:'.5em 1em'}}
          className="flex-parent-row">
        <span style={{fontSize:'1.2em'}} className="flex-child-expand">Endorsers By Tags</span>
        <Link to="/endorsements">explore tags</Link>
      </div>
      <div style={{padding:'0 1em'}}>
        {this.renderTags()}
      </div>
    </div>;
  }
}

export default connect(selectState)(EndorsersPage)
