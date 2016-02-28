import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import {VelocityTransitionGroup} from 'velocity-react';
import CandidateList from './candidateList';
import cx from 'classnames';

function selectCandidates(state){
  const { candidates } = state;
  return { candidates };
}

const FILTER_CHOICES = [
  { id: 'ALL', text: 'All'},
  { id: 'RUN', text: 'Running'},
  { id: 'DOUT', text: 'Dropped Out'}
];

class CandidatesPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      filter : 'ALL'
    }
  }
  componentWillMount(){
    this.props.dispatch(fetchCandidatesIfNeeded());
  }
  filterOnActiveState(candidates){
    console.log(this.state.filter);
    switch(this.state.filter){
      case 'RUN':
        return candidates.filter( candidate => candidate.active );
      case 'DOUT':
        return candidates.filter( candidate => !candidate.active );
      default:
        return candidates;
    }
  }
  renderCandidates(){
    const filteredCandidates = this.filterOnActiveState(this.props.candidates);
    return <div key="list" className="container absolute">
      {this.renderFilterChoices()}
      <CandidateList candidates={filteredCandidates}/>
    </div>
  }
  renderChildRoute(){
    return <div key="children" className="container absolute">
      {this.props.children}
    </div>
  }
  renderFilterChoices(){
    return <div style={{
        margin:'0 0 1.5em 0',
        paddingRight:'4.5%',
        transition:'opacity .2s ease',
        opacity:this.props.children ? 0 :1,
        display:this.props.children ? 'none' : ''
      }} className="flex-parent-row flex-row-center">
      <div className="flex-parent-row flex-row-space-around">
        {FILTER_CHOICES.map(choice => {
          const {id, text} = choice;
          const choiceClasses = cx("candidates-filter-choice",
                                    {active: id === this.state.filter});
          return <span className={choiceClasses}
                       key={id}
                       onClick={() => { this.setState({filter:id}) }}>
            {text}
          </span>
          })
        }
      </div>
    </div>
  }
  render(){
    const routerState = this.props.location.state;
    const { back } = routerState || {};
    return <div id="candidates-page-content">
      <VelocityTransitionGroup enter={{
                                  animation:back ? "transition.slideLeftIn" : "transition.slideRightIn",
                                  duration:200
                                }}
                                leave={{
                                  animation:back ? "transition.slideRightOut" : "transition.slideLeftOut",
                                  duration:200
                                }}
                                component="div"
                                style={{position:'relative', width:'100%', height:'100%'}}
                                >
        {this.props.children ? this.renderChildRoute() : this.renderCandidates()}
      </VelocityTransitionGroup>
    </div>;
  }
}

export default connect(selectCandidates)(CandidatesPage)
