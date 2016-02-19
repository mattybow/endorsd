import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import '../styles/nav.scss';

export default class TopBar extends Component{
  render(){
    const links = [
      {path:'/endorsements', text:'endorsements'},
      {path:'/candidates', text:'candidates'},
      {path:'/endorsers', text:'endorsers'}
    ]
    return <div style={{
        position:'fixed',
        bottom:100,
        left:70
      }}>
      <nav>
        <div>
          {links.map(link => {
              const isLinkActive = this.props.path.match(new RegExp(link.path));
              const linkClasses = cx(
                { active:isLinkActive },
                "nav-link"
              );
              return <div className={linkClasses} key={link.text}>
                <Link to={link.path}>{link.text}</Link>
              </div>
            })
          }
        </div>
      </nav>
    </div>;
  }
}
