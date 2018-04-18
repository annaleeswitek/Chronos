import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllCategories extends Component {

  componentDidMount(){

  }

  render () {
    const { categories } = this.props;
    return (
      <div>
      {
          categories.map((category) => (
              <div key={category.id}>
                <Link to={'/categories/' + category.id}>{category.name}</Link>
              </div>
            ))
        }
      </div>
    );
  }
}

import { connect } from 'react-redux';
import AllCategories from './AllCategories.jsx';
import { loadCategories } from '../store/categories';

const mapStateToProps = ({categories}) => ({categories});

const mapDispatchToProps = dispatch => {
  return {
    loadCategories() {
      dispatch(loadCategories());
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(AllCategories);

export default Container;
