import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCategories } from '../store/categories';

/* ---- Component ---- */

class AllCategories extends Component {

  componentDidMount(){
    this.props.loadCategories();
  }

  render () {
    console.log('this.props.location', this.props.location);
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

/* ---- Container ---- */

const mapStateToProps = function(state) {
  return {
      categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories() {
      dispatch(loadCategories());
    }
  };
};


const Container = connect(mapStateToProps, mapDispatchToProps)(AllCategories);
export default withRouter(Container);

