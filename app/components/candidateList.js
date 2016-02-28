import React, { Component } from 'react';
import {colors} from '../styles/inlineConstants';
import {VelocityTransitionGroup} from 'velocity-react';
import {Link} from 'react-router';
import '../styles/candidate.scss';


export default class CandidateList extends Component{
  willEnter({data:{index}}){
    console.log(index);
    return {y:-30-index%3*50};
  }
  renderCandidates(){
    const { candidates, editClickHandler } = this.props;
    return candidates.map( (candidate,index) => {
      const { firstName, lastName, avatar, id, party, banner, active } = candidate;
      return <div className="candidate-list-item"
                    key={id}>
          <div className="banner">
            <div className="banner-bg" style={{
                backgroundImage:`url("${banner}")`
              }}></div>
            <div className="banner-filter"></div>
          </div>
          <div className="candidate-head-container flex-parent-row flex-row-center">
            <img src={avatar} alt="" style={{maxWidth:70, margin:'0 auto 0 0'}}/>
          </div>
          <div
            style={{
              padding:'10px 0'
            }}>
            <div style={{fontSize:'.9em', textAlign:'right'}}>
              <span>{firstName.toUpperCase()} {lastName.toUpperCase()}</span>
            </div>
            <div style={{fontSize:'.8em', color:colors.periwinkle, textAlign:'right', padding:'0 0 10 0'}}>
              <span>{party === 'D' ? 'Democrat' : party === 'R' ?
                'Republican' : 'Unknown'}</span>
            </div>
          </div>
          <Link to={`/candidates/candidate/${lastName}`} style={{
              position:'absolute',
              top:0,bottom:0,left:0,right:0
            }}></Link>
        </div>
      ;
    });
  }
  render(){
    return <div>
      <VelocityTransitionGroup enter={{
                                  animation:"transition.slideDownIn",
                                  stagger:70,
                                  drag:true
                                }}
                                runOnMount={true}
                                component="div"
                                className="flex-parent-row wrap flex-center">
        {this.renderCandidates()}
      </VelocityTransitionGroup>
    </div>;
  }
}
