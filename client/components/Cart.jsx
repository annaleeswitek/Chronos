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
    this.props.loadCart();

  }

  render () {
    const { productsInCart } = this.props;
    console.log('this.props in cart: ', this.props);

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
              <h1>{ product.lineItem.quantity }</h1>
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