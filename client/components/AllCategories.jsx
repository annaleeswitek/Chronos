import React, { Component } from 'react';

export default class AllCategories extends Component {

  ComponentDidMount(){
    this.props.loadCategories();
  }

  render () {
    return (
      <div>Hi</div>
    );
  }
}
