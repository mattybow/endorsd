import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginInfo, checkAuth } from '../actions/loginActions';
import Avatar from './avatar';

function selectLoginInfo(state){
  console.log(state);
  const { loginInfo } = state;
  return { loginInfo };
}

class LoginButton extends Component{
  componentWillMount(){
    const { dispatch } = this.props;
    const userInfo = this.getLoginInfoFromCookies();
    if(userInfo){
      dispatch(checkAuth());
    }
    dispatch(setLoginInfo(userInfo));
  }
  getLoginInfoFromCookies(){
    let loginInfo = {};
    const cookies = document.cookie + ';';
    const loginCookie = cookies.match(/userInfo=[^;]*/);
    if(loginCookie){
      const encodedInfo = loginCookie[0].replace(/userInfo=/,'');
      loginInfo = JSON.parse(decodeURIComponent(encodedInfo));
    }
    return loginInfo;
  }
  render(){
    const { displayName, profile_image_url } = this.props.loginInfo;
    let content = <a href="/auth/twitter">login</a>
    if(displayName){
      content = <div className="flex-parent-row">
        <Avatar url={profile_image_url}
                size={40}/>
      </div>;
    }
    return <div className="login-logout">{content}</div>;
  }
}

export default connect(selectLoginInfo)(LoginButton);
