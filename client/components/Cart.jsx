import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart } from '../store';

/* --- Component --- */
class Cart extends Component {

  constructor(){
    super();
    this.state = {
      change: false
    };
  }

  componentDidMount(){
    this.props.loadCart();

  }

  render () {
    const { productsInCart } = this.props;
    console.log('productsInCart', productsInCart)
    return (
      <div id="cart">
        <h2> YOUR CART </h2>
      {
        productsInCart && productsInCart.map((product) => (
          <div id="cartContainer">
            <Link to={`/products/${product.id}`}>
          <div key={product.id} id="singleProductInCart">
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
      </h4>
      <Link to="/checkout" >
      <Button id="checkoutBtn">Proceed to Checkout</Button>
      </Link>
      </div>
    )
  }
}

/* ---- Container ---- */
const mapState = state => ({productsInCart: state.cart});

const mapDispatch = dispatch => ({
  loadCart() {
    dispatch(loadCart());
  }
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
