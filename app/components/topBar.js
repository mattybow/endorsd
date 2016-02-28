import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';
import '../styles/nav.scss';

export default class TopBar extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  render(){
    console.log('render TopBar', this.props.pageName);
    const links = [
      {path:'/endorsements', text:'endorsements'},
      {path:'/candidates', text:'candidates'},
      {path:'/endorsers', text:'endorsers'}
    ]
    return <div id="nav">
      <nav>
        <div>
          {links.map(link => {
              const isLinkActive = link.path.match(new RegExp(this.props.pageName, 'i'));
              const linkClasses = cx(
                { active:isLinkActive },
                "nav-link"
              );
              return <Link to={link.path} key={link.text} onClick={this.props.clickHandler}>
                <div className={linkClasses}>
                  {link.text}
                </div>
              </Link>
            })
          }
        </div>
      </nav>
    </div>;
  }
}
