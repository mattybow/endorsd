import React, { Component } from 'react';
import FormContainer from './formContainer';
import ModalWrapper from './modalWrapper';
import EndorsementList from './endorsementList';
import SearchBox from './searchBox';
import cx from 'classnames';
import { colors } from '../styles/inlineConstants';
import { connect } from 'react-redux';
import {VelocityTransitionGroup} from 'velocity-react';
import { getEndorsements } from '../actions/endorsementActions';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import d3 from 'd3';
import topojson from 'topojson';
import '../styles/endorsementsPage.scss';
const { lavendar, periwinkle } = colors;
// const usStatesData = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL',
// 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI',
// 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH',
// 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
// 'WI', 'WY'].reduce((acc,stateAbrev) =>{
//   acc[stateAbrev] = {fillColor:lavendar}
//   return acc;
// },{});


function selectData(state,props){
  const { endorsements,
          candidates,
          searchResults: {
            searchResultsLoading,
            searchResults
          }
        } = state
  return {
    endorsements,
    candidates,
    isLoadingSearchResults: searchResultsLoading,
    endorsementSearchResults: searchResults
  }
}

class EndorsementsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
      showFilters:false,
      activeFilter:0,
    }
  }
  componentDidMount(){
    console.log(localStorage.getItem("endorsements-pos"));
    this.scrollToPreviousPos();
  }
  componentWillMount(){
    this.props.dispatch(fetchCandidatesIfNeeded());
    this.props.dispatch(getEndorsements());
  }
  componentDidUpdate(){
    if(!this.props.children){
      setTimeout(()=> {
        this.scrollToPreviousPos();
        console.log("set scroll pos");
      },50);
    }
    if(this.state.showFilters){
      this.renderD3map();
    }
  }
  scrollToPreviousPos(){
    window.scrollTo(0,parseInt(localStorage.getItem("endorsements-pos")));
  }
  renderD3map(){
    var w = this.refs.usMap.offsetWidth;
    var h = 300;
    var proj = d3.geo.albersUsa();
    var path = d3.geo.path().projection(proj);
    var t = proj.translate(); // the projection's default translation
    var s = proj.scale() // the projection's default scale

    var map = d3.select("#us-map").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .call(d3.behavior.zoom().on("zoom", zoomed));

    var us = map.append("svg:g").attr("id", "us");

    d3.json("https://s3-us-west-2.amazonaws.com/candidb/endrs/us.topojson.json", json => {
      console.log(json.objects.usa);
      topojson.presimplify(json);
      us.append("path")
        .datum(topojson.feature(json,json.objects.usa))
        .attr("d", path);
    });
    function zoomed() {
      us.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      us.select(".state-border").style("stroke-width", 1.5 / d3.event.scale + "px");
    }

    function redraw() {
      //var start = new Date().valueOf();
      // d3.event.translate (an array) stores the current translation from the parent SVG element
      // t (an array) stores the projection's default translation
      // we add the x and y vales in each array to determine the projection's new translation
      var tx = t[0] * d3.event.scale + d3.event.translate[0];
      var ty = t[1] * d3.event.scale + d3.event.translate[1];
      proj.translate([tx, ty]);

      // now we determine the projection's new scale, but there's a problem:
      // the map doesn't 'zoom onto the mouse point'
      proj.scale(s * d3.event.scale);

      // redraw the map
      us.selectAll("path").attr("d", path);
      //console.log('redraw done', new Date().valueOf() - start, 'ms');
    }
  }
  searchTermFromDb = (term) => {
    this.props.dispatch(searchEndorsements(term));
  };
  getEndorsementById(id){
    return this.props.endorsements.find(
      endorsement => endorsement.id === id
    )
  }
  toggleFilter = () => {
    this.setState({showFilters:!this.state.showFilters})
  };
  renderFilterControls(){
    return <div className="filters flex-parent-row"
      style={{
        transition:'transform .3s ease',
        transform:`translateX(${-1*(this.state.activeFilter * 90 - (this.state.activeFilter=== 0 ? 0 : 1) * 2.5)}%)`
      }}>
      <div className="filter flex-parent-row wrap flex-row-center">
        {this.props.candidates.map(candidate => <div style={{width:80, margin:'0 5'}} key={candidate.id}>

          <div style={{
            width:70,
            margin:'0 auto 5'
          }}>
            <img src={candidate.avatar}
                alt=""
                style={{
                  width:70
                }}/>
          </div>
          <div style={{textAlign:'center',fontSize:'.8em', borderTop:'1px solid rgba(255,255,255,.1)'}}>{candidate.lastName}</div>

        </div>)}
      </div>
      <div className="filter flex-parent-row"><div ref="usMap" id="us-map"
        style={{
          width:'100%',
          height:'100%'
        }}></div></div>
      <div className="filter flex-parent-row"><div style={{margin:'auto'}}>Tags</div></div>
      <div className="filter flex-parent-row"><div style={{margin:'auto'}}>Time Filter</div></div>
    </div>;
  }
  renderChildren(key){
    //console.log('children', styles[0].style.x);
    return <div style={{
        position:'absolute',top:0,left:0,right:0,bottom:0,zIndex:10
                }}
                key={key}>
                <div>
                  {this.props.children}
                </div>
            </div>;
  }
  renderList(key){
    console.log('render list [endorsementsPage.js]')
    return  <div key={key}>
      <div className="search-box flex-parent-row"
        style={{
          padding:"0 5%"
        }}>
        <SearchBox placeholderText="Search"/>
        <button className="btn-naked no-border"
                onClick={this.toggleFilter}>
          <span className="icon-filter icon-lg icon-flush-right"></span>
        </button>
      </div>
      <div id="filter-control-holder" style={{
          position:'relative',
        }}>
        <div id="filter-controls"
              style={{
                  overflow:'hidden',
                  position:'absolute',
                  left:0,
                  top:0,
                  right:0,
                  transition: 'height .3s ease',
                  height: this.state.showFilters ? 400 : 0,
                  padding:'0 5%',
                }}>
          <div className="tabs flex-parent-row">
            {['Candidate','Location','Tag','Time'].map((tabName,index) => {
              const tabClasses = cx('filter-tab',{active:index===this.state.activeFilter});
              return <div className={tabClasses} key={index}
                onClick={() => {this.setState({activeFilter:index})}}>
                {tabName}
              </div>;
            })}
          </div>
          <div className="filters-window"
            style={{
              margin:'0',
              overflow:'hidden',
            }}>
            { this.state.showFilters ? this.renderFilterControls() : '' }
          </div>
        </div>
      </div>
      <div style={{
          transition:'transform .3s ease',
          transform:this.state.showFilters ? 'translateY(400px)' : 'translateY(0)'
        }}>
        <EndorsementList endorsements={this.props.endorsementSearchResults.length ?
            this.props.endorsementSearchResults : this.props.endorsements}/>
      </div>
    </div>
  }
  _willLeave(){
    return {x:spring(-50,{stiffness: 120, damping: 14})}
  }
  _willEnter(){
    return {x:50}
  }
  render(){
    console.log(this.props);
    const routerState = this.props.location.state;
    const { back } = routerState || {};
    console.log(back)
    return <div id="endorsements-page-content">
      <VelocityTransitionGroup enter={{
                                  animation:back ? "transition.slideLeftIn" : "transition.slideRightIn",
                                  duration:200
                                }}
                                leave={{
                                  animation:back ? "transition.slideRightOut" : "transition.slideLeftOut",
                                  duration:200
                                }}
                                >
        {this.props.children ?
          this.renderChildren('a') :
          this.renderList('b')}
      </VelocityTransitionGroup>
    </div>;
  }
}

export default connect(selectData)(EndorsementsPage);
