import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import EndorsementList from './endorsementList';

function getData(state,props){
  console.log(props, props.params.name);
  const candidate = state.candidates.find(
    candidate => candidate.lastName.match(new RegExp(props.params.name,'i'))
  );
  console.log(state.candidates);
  return {
    candidate:{...candidate},
    endorsements:state.endorsements.filter(e => e.candidateLastName === props.params.name)
  }
}

class CandidateDetails extends Component{
  renderDroppedOutTag(){
    return <span style={{ marginLeft:10,
                          fontSize: '.5em',
                          padding:'2px 5px',
                          overflow:'hidden',
                          borderRadius:2,
                          backgroundColor:'rgba(255,255,255,.1)'
                        }}>
      Dropped Out
    </span>;
  }
  render(){
    const {candidate : { avatar, firstName, lastName, banner, descript, active, party}} = this.props;
    console.log(this.props.candidate);
    return <div style={{position:'relative'}}>
      <div style={{zIndex:2, position:'absolute',top:0, left:0}}>
        <Link to={`/${this.props.location.pathname.match(/(\/)(\w+)/)[2]}`} state={{back:true}}>
          <div className="back-button-holder">
            <span className="icon-wm10-back icon-lg"></span>
          </div>
        </Link>
      </div>
      <div className="big banner" style={{position:'relative', zIndex:0}}>
        <div className="banner-bg" style={{
            backgroundImage:`url("${banner}")`
          }}></div>
        <div className="banner-filter"></div>
        <div className="flex-parent-row start"
             style={{
               position:'absolute',
               bottom:0,
               left:0,
               padding:'1em 5%',
               width:'100%'
             }}>
          <div className="candidate-info">
            <div style={{
                borderTop:`3px solid ${party==='D' ? '#275E9E' : '#6D2027'}`,
                marginBottom:'.5em',
                width:40
            }}></div>
            <div className="flex-parent-row" style={{fontSize:'1.5em'}}>
              <span>
                {firstName} {lastName}
              </span>
              {active ? '' : this.renderDroppedOutTag() }
            </div>
            <div style={{ margin:'1.5em 0', maxWidth:500, fontSize:'.8em'}}>{descript}</div>
          </div>
        </div>
      </div>
      <div className="tri-bg-holder absolute container" style={{zIndex:1, overflow:'hidden', height:400}}>
        <div className="tri"></div>
      </div>
      <div className="flex-parent-row"
           style={{padding:'1em 5%', borderBottom:'1px solid rgba(255,255,255,.1)'}}>
        <div className="recents flex-child-expand" style={{fontSize:'1.2em'}}>Latest Endorsements</div>
        <Link to="/endorsements?candidate=Cruz">see all</Link>
      </div>
      <EndorsementList endorsements={this.props.endorsements}/>
    </div>;
  }
}

export default connect(getData)(CandidateDetails)
