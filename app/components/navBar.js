import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import '../styles/navbar.scss';

const links = [
  {
    route:'/tweets',
    text:'Tweets',
    iconClass: 'icon-chat'
  },
  {
    route:'/candidates',
    text:'Candidates',
    iconClass: 'icon-star'
  },
  {
    route:'/endorsers',
    text:'Endorsers',
    iconClass: 'icon-pencil'
  },
  {
    route:'/endorsements',
    text:'Endorsements',
    iconClass: 'icon-empty-blank'
  },
  {
    route:'/tags',
    text:'Tags',
    iconClass: 'icon-label'
  }
];

export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      route:undefined
    };
  }
  clickHandler(route){
    this.setState({route});
  }
  render(){
    const activeRoute = this.state.route || window.location.pathname;

    const elements = links.map( link => {
      const isActive = activeRoute === link.route || (activeRoute === '/' && link.route === '/tweets');
      const tabClasses = cx('tab-link',
                            {active:isActive}
                          );
      return (
        <Link to={link.route} onClick={this.clickHandler.bind(this,link.route)} className="flex-child-expand" key={link.text}>
          <div className={tabClasses}>
            <div className="tab-icon-holder mobile-only">
              <span className={link.iconClass}></span>
            </div>
            <div className="tab-descript-holder">
              {link.text}
            </div>
          </div>
        </Link>
      );
    });
    return <div className="flex-parent-row" id="navbar">
      {elements}
    </div>;
  }
}
