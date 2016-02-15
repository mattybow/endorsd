import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';

export default class AddButton extends Component{
  render(){
    return <div className="floating-add-button">
      <FloatingActionButton onClick={this.props.clickHandler}
                            backgroundColor='#A06CD5'>
        <div className="flex-parent-row flex-row-center">
          <span className="icon-plus icon-lg"></span>
        </div>
      </FloatingActionButton>
    </div>;
  }
}
