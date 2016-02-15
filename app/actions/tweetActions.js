import * as ACTION_TYPES from '../constants/tweetTypes';
import * as api from './api';

const { REQUEST_TWEETS,
        REQUEST_TWEETS_FAIL,
        RECEIVE_TWEETS,
        DELETE_TWEET,
        UNDELETE_TWEET } = ACTION_TYPES;

export function fetchTweetsIfNeeded(){
  return (dispatch, getState) => {
    dispatch(requestTweets());
    api.getTweets().then(
      data => {
        dispatch(receiveTweets(data.data));
      },
      err => {
        dispatch(requestTweetsFail(err));
      }
    );
  }
}

function requestTweets(){
  console.log('request tweets');
  return {
    type: REQUEST_TWEETS
  }
}

function requestTweetsFail(err){
  console.log('request tweets fail');
	return {
		type:REQUEST_TWEETS_FAIL,
		err
	};
}

function receiveTweets(data){
  return {
    type: RECEIVE_TWEETS,
    data
  }
}

export function requestTweetDelete(id){
  return (dispatch, getState) => {
    const tweet = getState().tweets.find( tweet => (tweet.id === id) );
    console.log(tweet);
    dispatch(deleteTweet(id));
    api.deleteTweet(id).then(
      null,
      err => {
        dispatch(undeleteTweet(tweet));
      }
    );
  }
}

function deleteTweet(id){
  return {
    type: DELETE_TWEET,
    id
  }
}

function undeleteTweet(tweet){
  return {
    type: UNDELETE_TWEET,
    tweet
  }
}
