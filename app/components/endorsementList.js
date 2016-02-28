import React, { Component } from 'react';
import moment from 'moment';
import { igDate } from '../util';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DualAvatar from './dualAvatar';
import { colors } from '../styles/inlineConstants';
import {Link} from 'react-router';
import '../styles/endorsementList.scss'

const {periwinkle, grey} = colors;

export default class EndorsementList extends Component {
  shouldComponentUpdate(props,state){
    const verdict = shouldPureComponentUpdate.apply(this,arguments);
    console.log(this.props,props, verdict, new Date().valueOf());
    return verdict;
  };
  render(){
    const startTime = new Date().valueOf();
    const endorsements = this.renderEndorsements(this.props.endorsements);
    console.log('render took ', new Date().valueOf()-startTime, ' ms', new Date().valueOf());
    return <div>
      {endorsements}
    </div>;
  }
  renderEndorsements(endorsements) {
    return endorsements.map(endorsement => {
      const { can_id, endAvatar, canAvatar, endorser, candidateName, candidateLastName, id, date, confirmed, descript} = endorsement;
      return <div className="flex-parent-row start list-item-spacing endorsement-list-item" key={id}
        style={{
          padding:'15px 5% 15px 5%'
        }}>
        <DualAvatar canAvatar={canAvatar}
                    endAvatar={endAvatar}/>
        <div className="flex-child-expand endorser-list-item-container">
          <div className="flex-parent-row start">
            <div className="flex-child-expand endorser-info">
              <div style={{
                  color:periwinkle
                }}>
                <div >{endorser}
                  <div style={{
                      fontSize:'.8em',
                      color:'white'
                    }}>{descript}
                  </div>
                </div>
              </div>
            </div>
            <div className="time">
              {igDate(new Date(date))}
            </div>
          </div>
          <div style={{
              margin:'10 0 5',
              width:50,
              height:1,
              backgroundColor:'rgba(255,255,255,.1)'
            }}></div>
            <div style={{ fontSize:'.8em', color:'white'}}>
              <span>{confirmed ? "endorsed" : "will endorse"}</span>
                <Link to={`/endorsements/candidate/${candidateLastName}`}
                      onClick={()=>{
                        console.log("setting local storage val", window.scrollY);
                        localStorage.setItem("endorsements-pos", window.scrollY);
                      }}>
                  <span style={{
                          color:periwinkle
                        }}> {candidateName}
                  </span>
                </Link>
              </div>
        </div>
      </div>
    })
  }
}
