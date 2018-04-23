import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
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
    //check if there are already products on the cart
    //if so, don't reload -- this if is a temporary fix -- 
    // products are not permanently associated with cart
    if (!this.props.productsInCart.length) this.props.loadCart();

  }

  render () {
    const { productsInCart } = this.props;

    console.log('productsInCart:', productsInCart);

    return (
      <div id="cart">
        <h2> YOUR CART </h2>
      {
        productsInCart && productsInCart.map((product) => (
          <Col sm={10} md={4}  key={product.id} id="singleProduct">
            <Link to={`/products/${product.id}`}>
              <img id="shrink" src={product.imgUrl} />
              <h5>{product.title}</h5>
              <h5>$ {product.price}</h5>
            </Link>
          </Col>
        ))
      }
      </div>
    );
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
