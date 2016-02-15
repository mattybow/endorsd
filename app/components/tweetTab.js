import React, { Component } from 'react';
import TweetList from './tweetList';
import AddEndorsementForm from './addEndorsementForm';
import LoadingIndicator from './loadingIndicator';
import ModalWrapper from './modalWrapper';
import FormContainer from './formContainer';
import moment from 'moment';
import {connect} from 'react-redux';

import { fetchTweetsIfNeeded, requestTweetDelete } from '../actions/tweetActions';
import { updateEndorsementForm, saveEndorsement, clearEndorsementForm } from '../actions/endorsementFormActions';

function selectTweets(state){
  const {tweets} = state;
  return {tweets};
}

class TweetTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      formOpen:false
    }
  }
  componentWillMount(){
    this.props.dispatch(fetchTweetsIfNeeded());
  }
  openForm = ({text, link, created_at}) => {
    this.props.dispatch(updateEndorsementForm({
      tweetText:text,
      source:link,
      date:moment(new Date(created_at)).format('YYYY-MM-DD')
    }));
    this.setState({formOpen:true});
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  clearForm = () => {
    this.props.dispatch(clearEndorsementForm());
  }
  saveForm = () => {
    console.log('save form');
    this.props.dispatch(saveEndorsement());
  }
  deleteTweet = (id) => {
    this.props.dispatch(requestTweetDelete(id));
  }
  render(){
    const noTweets = !this.props.tweets.length;

    if(noTweets){
      return <LoadingIndicator />
    }

    const addForm = <FormContainer formName="Add Endorsement"
                                   closeHandler={this.closeForm}
                                   saveHandler = {this.saveForm}
                                   clearHandler = {this.clearForm}>
      <AddEndorsementForm />
    </FormContainer>;

    return <div>
      <TweetList tweets = {this.props.tweets}
                 addHandler = {this.openForm}
                 deleteTweet = {this.deleteTweet}/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? addForm : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectTweets)(TweetTab);
