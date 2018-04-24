'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadOneCategory } from '../store';

/* ---- Component ---- */
class SingleCategory extends Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.categoryId !== this.props.match.params.categoryId){
      nextProps.loadOneCategory(nextProps.match.params.categoryId);
    }
  }

  componentDidMount () {
    const categoryId = this.props.match.params.categoryId;
    this.props.loadOneCategory(categoryId);
  }

  render () {
    const { selectedCategory } = this.props;
    let productArr = [];
    let products = [];
    if (selectedCategory) {
      products = selectedCategory.products;
      productArr = this.props.selectedCategory.product;
    }

    return (
      <div id="singleCategoryView">
        { selectedCategory
          ? <h1 id="singleCategoryHeader">{selectedCategory.name}</h1>
          : null
        }
        {
          productArr && productArr.map(product => (
          <div key={product.id}>
            <section className="product">
              <div>Product</div>
              <img src={product.imgUrl} />
            </section>
          </div>))
        }

      </div>
    );
  }
}

/* ---- Container ---- */
const mapState = state => ({
  selectedCategory: state.selectedCategory
});

const mapDispatch = dispatch => ({
  loadOneCategory(categoryId) {
    const thunkAction = loadOneCategory(categoryId);
    dispatch(thunkAction);
  }
});


export default connect(mapState, mapDispatch)(SingleCategory);

