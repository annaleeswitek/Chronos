import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart, addToCart, removeFromCart } from '../store';


/* --- Component --- */
class Cart extends Component {

  constructor(){
    super();
    this.state = { 
      quantity: 0, 
      disabled: false
    };
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  componentDidMount(){
    this.props.loadCart();
  }

  onQuantityChange(event){
    
    if(event.target.value) this.setState({ quantity: event.target.value, disabled: false })
    else this.setState({disabled: true })
    
  }

  render () {
    const { quantity, disabled } = this.state;
    const { productsInCart, addToCart, removeFromCart } = this.props;
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
              <h1>{product.lineItem.quantity}</h1>
               
                 

                
            </Link>
            <FormGroup>
                  <FormControl type="text" value={quantity} name="quantity" componentClass="select" onChange={this.onQuantityChange}>
                   { options.map(option => <option key={option} value={option}>{option}</option>)}
                  </FormControl>
                  <span><Button id="addToCartBtn" onClick={addToCart.bind(this, product, quantity)} disabled={disabled}>Add {quantity}</Button></span>
                  <span><Button id="removeFromCartBtn" onClick={removeFromCart.bind(this, product, quantity)}>Remove {quantity} </Button></span>
            </FormGroup>
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
  }, 
  addToCart(product, quantity, event){
    console.log('adding', quantity);
    console.log('product', product);
    event.preventDefault();
    product.currentQuantity = product.lineItem.quantity;
    product.quantityToAdd = quantity;
    dispatch(addToCart(product));
  }, 
  removeFromCart(product, quantity, event){
    console.log('removing  quantity: ', quantity)
    event.preventDefault();
    product.quantityToRemove = quantity;
    dispatch(removeFromCart(product));
  }
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
