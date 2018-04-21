'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

/* ---- Component ---- */
class AddProduct extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      price: '',
      quantity: '',
      imgUrl: '',
      description: '',
      disabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  handleChange(event){
    if (event.target.name === 'title' && event.target.value !== '') this.setState({ [event.target.name]: event.target.value, disabled: false });
    else this.setState({ [event.target.name]: event.target.value});
  }

  getValidationState() {
    let title = this.state.title;
    if (title !== '') return 'success';
    return 'error';
  }

  handleSubmit(event){
    event.preventDefault();
    let { title, price, quantity, imgUrl, description } = this.state;
    this.props.addProduct({ title, price, quantity, imgUrl, description});
    this.setState({ title: '', price: '', quantity: '', imgUrl: '', description: ''});
  }


  render() {
    let { title, price, quantity, imgUrl, description, disabled } = this.state;
    return (
      <div>
        <h3>Add New Product</h3>
          <FormGroup validationState={this.getValidationState()} id="addProductForm">
            <div className="titlePrice">
            <ControlLabel className="col-xs-2 control-label"><h5><b>Name</b></h5>
              <FormControl value={title} name="title" type="text" placeholder="product name (required)" onChange={this.handleChange} value={title} />
              { this.state.disabled && <h5 id="warningName">Please enter a name</h5>}
            </ControlLabel>

            <ControlLabel className="col-xs-2 control-label"><h5><b>Price</b></h5>
              <FormControl value={price} name="price" type="text"  placeholder="product price (required)" value={this.state.price} onChange={this.handleChange} />
            </ControlLabel>
            </div>
            <div className="quantityImg">
            <ControlLabel className="col-xs-2 control-label"><h5><b>Quantity</b></h5>
              <FormControl value={quantity} name="quantity" type="text"  placeholder="product quantity" value={this.state.quantity} onChange={this.handleChange} />
            </ControlLabel>


            <ControlLabel className="col-xs-2 control-label"><h5><b>Image</b></h5>
              <FormControl value={imgUrl} name="imgUrl" type="text"  placeholder="product image" value={this.state.imgUrl} onChange={this.handleChange} />
            </ControlLabel>
            </div>
            <div className="descSubmit">
            <ControlLabel className="col-xs-2 control-label"><h5><b>Description</b></h5>
              <FormControl value={description} className="desc" name="description" type="text"  componentClass="textarea" placeholder="product description" onChange={this.handleChange} />
            </ControlLabel>

            <Button type="submit" id="addButton" disabled={disabled} onClick={this.handleSubmit}>Add Product to Catalog</Button>
            </div>
          </FormGroup>
      </div>
      );
    }
}


/* ---- Container ---- */
const mapState = state => ({
    products: state.products
});

const mapDispatch = dispatch => ({
    addProduct(product) {
        const title = product.title;
        const price = product.price === '' ? 0.00 : product.price;
        const description = product.description === '' ? null : product.description;
        const quantity = product.quantity  === '' ? 0 : product.quantity;
        const imgUrl = product.imgUrl === '' ? null : product.imgUrl;
        const action = addProduct({title, price, description, quantity, imgUrl});
        dispatch(action);
    }
});

export default connect(mapState, mapDispatch)(AddProduct);

