'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

import { EditProduct } from './index';
import { fetchOneProduct, addToCart } from '../store';

/* ---- Component ---- */
class SingleProduct extends Component {
  constructor(){
    super();
    this.state = {
      quantity: 0, 
      disabled: true
    };
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  onQuantityChange(event){
    console.log('event in on quant change: ', event.target.value); 
    if(event.target.value) this.setState({ quantity: event.target.value, disabled: false })
    else this.setState({disabled: true })
    
  }

  render(){
    const { user, product, addToCart } = this.props;
    const { quantity, disabled } = this.state;
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log('state quantity: ', quantity);
    return (
      <div className="product">
        { product.id
          ?  <section id="product">
              <div id="allButDesc">
                <h3>{ product.title }</h3>
                <img src={ product.imgUrl } />
                
                
              </div>
              <div id="description">
                <h4>{ product.description }</h4>
                <h4>${ product.price }</h4>
                <FormGroup>
                  <FormControl type="text" value={quantity} name="quantity" componentClass="select" onChange={this.onQuantityChange}>
                   { options.map(option => <option key={option} value={option}>{option}</option>)}
                  </FormControl>
                  <Button onClick={addToCart.bind(this, product, quantity)} disabled={disabled}>Add To Cart</Button>
                </FormGroup>
                
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
  user: state.user, 
  cart: state.cart
});

const mapDispatch = dispatch => ({
  fetchOneProduct(productId) {
    dispatch(fetchOneProduct(productId));
  }, 
  addToCart(product, quantity, event){
    event.preventDefault();
    product.quantity = quantity;
    dispatch(addToCart(product));
  }
});

export default connect(mapState, mapDispatch)(SingleProduct);
