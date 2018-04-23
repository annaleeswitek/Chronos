'use strict';

import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart, updateCart } from '../store';

/* --- Component --- */
class Cart extends Component {
  constructor(){
    super();
    this.state = {
      cartStatus: 'cart'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.loadCart();
  }

  handleClick(event) {
    event.preventDefault();
    let { cartStatus } = this.state;
    this.props.updateCart({ cartStatus });
  }

  render () {
    const { productsInCart } = this.props;
    console.log('products in cart: ', productsInCart);
    console.log('loadCart', updateCart)
    return (
      <div id="cart">
      <Grid>
        <h2> YOUR CART </h2>
      {
        productsInCart && productsInCart.map((product) => (
        <div key={product.id} id="cartContainer">
          <Link to={`/products/${product.id}`}>
            <div id="singleProductInCart">
              <h4>Item: {product.title}</h4>
              <h4>Quantity: {product.lineItems.quantity}</h4>
              <h4>$ {(product.price * product.lineItems.quantity).toFixed(2)}</h4>
           </div>
          </Link>
        </div>
        ))
      }
      <h4>Your Total $ {
        productsInCart && productsInCart
        .map(product => product.lineItems.price * product.lineItems.quantity)
        .reduce((acc, val) => { return acc + val; }, 0)
        .toFixed(2)
      }
      <Button id="changeStatusBtn" onClick={this.handleClick}>Change Status</Button>
      </h4>
      <Link to="/checkout" >
      <Button id="checkoutBtn">Proceed to Checkout</Button>
      </Link>
      </Grid>
      </div>
    )
  }
}

/* ---- Container ---- */
const mapState = state => ({
  productsInCart: state.cart
});

const mapDispatch = dispatch => ({
  loadCart() {
    dispatch(loadCart());
  },
  updateCart: (cart) => {
    const action = updateCart(cart);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
