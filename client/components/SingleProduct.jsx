'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EditProduct } from './index';
import { fetchOneProduct } from '../store';

/* ---- Component ---- */
class SingleProduct extends Component {

  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user, product } = this.props;

    return (
      <div className="product">
        { product.id
          ?  <section id="product">
              <div id="allButDesc">
                <h3>{ product.title }</h3>
                <img src={ product.imgUrl } />
                <h4>${ product.price }</h4>
                <a href="#">Add To Cart</a>
              </div>
              <div id="description">
                <h4>{ product.description }</h4>
                
              </div>
            </section>
          : <h2>Product Not Found</h2>
        }
        <div id="editProduct">
        {
          //passing location as a prop here because i need to make sure that edit product has access to product
          user.isAdmin && <EditProductContainer location={location}/>
        }
        </div>
      </div>
    );
  }
}

/* ---- Container ---- */
const mapState = state => ({
  product: state.product,
  user: state.user
});

const mapDispatch = dispatch => ({
  fetchOneProduct(productId) {
    const thunkAction = fetchOneProduct(productId);
    dispatch(thunkAction);
  }
});

export default connect(mapState, mapDispatch)(SingleProduct);
