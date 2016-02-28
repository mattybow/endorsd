import React, { Component } from 'react'
import TopBar from './topBar';
import NavBar from './navBar';
import PageHolder from './pageHolder';
import cx from 'classnames';
import '../styles/normalize.css';
import '../styles/main.scss';
require('velocity-animate');
require('velocity-animate/velocity.ui');

class Hamburger extends Component {
  render(){
    const hamburgerClasses = cx("mobile-only", "flex-parent-row", "flex-row-end", {open:this.props.isOpen});
    return <div className={hamburgerClasses}
         id="hamburger-container"
         onClick={this.props.clickHandler}
         style={{
           position:this.props.isOpen ? 'fixed' : 'absolute',
         }}>
      <div id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  }
}

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuOpen:false
    }
  }
  toggleMenu = () => {
    this.setState({menuOpen:!this.state.menuOpen});
  };
  _pathToPageName(path){
    switch(path.match(/(\/)(\w*)/)[2]){
      case 'endorsements':
        return "Endorsements";
      case 'candidates':
        return 'Candidates';
      case 'endorsers':
        return 'Endorsers';
    }
    return 'Hmmmm';
  }
  render(){
    console.log('rerender app');
    const touchCapable = 'ontouchstart' in window ? 'touch' : 'no-touch';
    const menuClasses = cx({"menu-open": this.state.menuOpen});
    const pageName = this._pathToPageName(this.props.location.pathname)
    return <div className={touchCapable}>
      <div className="background"
        style={{
          backgroundImage:'url("https://s3-us-west-2.amazonaws.com/candidb/endrs/bg.png")',
          position:'fixed',top:0,bottom:0,left:0,right:0,
          backgroundSize:'cover',
          backgroundPosition:'100% 100%',
          zIndex:0
        }}></div>
      <TopBar pageName={pageName}
              clickHandler = {this.toggleMenu}/>
      <div id="page-txfm-container">
        <div className={menuClasses} id="mobile-menu-txfm">
          <PageHolder pageName={pageName}
                      path = {this.props.location.pathname}>
            {this.props.children}
          </PageHolder>
        </div>
      </div>
      <Hamburger isOpen={this.state.menuOpen}
                 clickHandler = {this.toggleMenu}/>

    </div>;
  }
}
