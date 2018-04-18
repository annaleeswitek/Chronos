import React, { Component } from 'react';


export default class SingleCategory extends Component {

  componentDidMount () {
    this.props.loadOneCategory(this.props.selectedCategory.id);
  }

  render () {
    return (
      <div>{console.log('here', this.props.selectedCategory)}</div>
    );
  }
}
