import React, { Component } from 'react';
import moment from 'moment';
import { igDate } from '../util';
import Avatar from './avatar';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { colors } from '../styles/inlineConstants';
import '../styles/endorsementList.scss'

const {periwinkle, grey} = colors;

export default class EndorsementList extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  renderEndorsements() {
    return this.props.endorsements.map(endorsement => {
      const { can_id, end_avatar, can_avatar, endorser, candidate, id, date, confirmed, descript} = endorsement;
      return <div className="flex-parent-row start list-item-spacing endorsement-list-item" key={id}
        style={{
          padding:'15px 5% 15px 5%'
        }}>
        <div className="heads"
             style={{
               position:'relative'
             }}>
          <Avatar url={end_avatar}
                  size={50}/>
          <div style={{
              width:40,
              height:40,
              position:'absolute',
              right:-20,
              bottom:-20,
              backgroundImage:`url(${can_avatar})`,
              backgroundSize:'cover'
            }}></div>
        </div>
        <div style={{marginLeft:40}} className="flex-child-expand">
          <div className="flex-parent-row start">
            <div className="flex-child-expand">
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
                <span style={{
                        color:periwinkle
                      }}> {candidate}
                </span>
              </div>



        </div>
      </div>
    })
  }
  render(){
    const startTime = new Date().valueOf();
    const endorsements = this.renderEndorsements();
    console.log('render took ', new Date().valueOf()-startTime, ' ms');
    return <div>
      {endorsements}
    </div>;
  }
}
