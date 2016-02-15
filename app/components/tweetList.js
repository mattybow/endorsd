import React, { Component } from 'react';
import moment from 'moment';
import shouldPureComponentUpdate from 'react-pure-render/function';
import '../styles/tweetList.scss'

var TweetListItem = (props) => {
  const { addHandler,
          deleteHandler,
          tweet,
          tweet:
            { text,
              link,
              created_at}
          } = props;
  const time = moment(new Date(created_at)).format('lll');
  const isTouchDevice = 'ontouchstart' in window;
  const statusId = link.match(/[\d]*$/)[0];
  return <li className="tweet-list-item">
    <div className="flex-parent-row">
      <div className="btn-default add-endorsement-holder flex-child-start" onClick={addHandler.bind(this, tweet)}>
        <span className="icon-plus"></span>
      </div>
      <a href={isTouchDevice ? `twitter://status?id=${statusId}` : link}
         className="tweet-content"
         target="_blank">
        <div style={{wordWrap: 'break-word'}}>{text}</div>
        <div style={{color:"#A06CD5"}}>{time}</div>
      </a>
      <div className="btn-default remove-tweet-holder flex-child-start" onClick={deleteHandler.bind(this, statusId)}>
        <span className="icon-trash-bin"></span>
      </div>
    </div>
  </li>;
};


export default class TweetList extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  renderTweets(){
    const {tweets} = this.props;
    return tweets.map(
      (tweet, i) => <TweetListItem tweet={tweet}
                                   key={tweet._id}
                                   addHandler={this.props.addHandler}
                                   deleteHandler={this.props.deleteTweet.bind(this,tweet._id)} />
    );
  }
  render(){
    console.log('renderTweetList');
    return <ul className="tweet-list">
      {this.renderTweets()}
    </ul>
  }
}
