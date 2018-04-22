'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { EditProduct } from './index';
import { fetchOneProduct, addToCart } from '../store';

/* ---- Component ---- */
class SingleProduct extends Component {

  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user, product, addToCart } = this.props;

    return (
      <div className="product">
        { product.id
          ?  <section id="product">
              <div id="allButDesc">
                <h3>{ product.title }</h3>
                <img src={ product.imgUrl } />
                <h4>${ product.price }</h4>
                <Button onClick={addToCart.bind(this, product)}>Add To Cart</Button>
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
          user.isAdmin && <EditProduct location={location} />
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
    dispatch(fetchOneProduct(productId));
  }, 
  addToCart(product, event){
    // console.log('product ', product);
    dispatch(addToCart(product));
  }
});

export default connect(mapState, mapDispatch)(SingleProduct);
