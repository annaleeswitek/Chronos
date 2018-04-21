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
      categories: '', 
      disabled: true
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

 
  handleChange(event){
    if(event.target.name === 'title' && event.target.value !== '') this.setState({ [event.target.name] : event.target.value, disabled: false })
    else this.setState({ [event.target.name] : event.target.value})
  }

  getValidationState() {
    let title = this.state.title;
    if (title !== '') return 'success';
    return 'error';
  }

  handleSubmit(event){
    event.preventDefault();
    
    let { title, price, quantity, imgUrl, description, categories } = this.state;
    this.props.addProduct({ title, price, quantity, imgUrl, description}, categories);
    this.setState({ title: '', price: '', quantity: '', imgUrl: '', description: '', categories: ''})
  }


  render() {
    let { title, price, quantity, imgUrl, description, categories, disabled } = this.state;
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
                <FormControl value={price} name="price" type="text"  placeholder="product price (required)" value={this.state.price} onChange={this.handleChange}/>
              </ControlLabel>
            </div>

            <div className="quantityImg">
              <ControlLabel className="col-xs-2 control-label"><h5><b>Quantity</b></h5>
                <FormControl value={quantity} name="quantity" type="text"  placeholder="product quantity" value={this.state.quantity} onChange={this.handleChange}/>
              </ControlLabel>
              <ControlLabel className="col-xs-2 control-label"><h5><b>Image</b></h5>
                <FormControl value={imgUrl} name="imgUrl" type="text"  placeholder="product image" value={this.state.imgUrl} onChange={this.handleChange}/>
              </ControlLabel>
            </div>

            <div className="categoriesDesc">
              <ControlLabel className="col-xs-2 control-label"><h5><b>Categories</b></h5>
                <FormControl name="categories" type="text" placeholder="update product image" onChange={this.handleChange} value={categories}/>
              </ControlLabel>
              <ControlLabel className="col-xs-2 control-label"><h5><b>Description</b></h5>
                <FormControl value={description} className="desc" name="description" type="text"  componentClass="textarea" placeholder="product description" onChange={this.handleChange}/>
              </ControlLabel>
            </div>

            <Button type="submit" className="addEditButton" disabled={disabled} onClick={this.handleSubmit}>Add Product to Catalog</Button>
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
    addProduct(product, categories) {
        const title = product.title;
        const price = product.price;
        const description = product.description;
        const quantity = product.quantity;
        const imgUrl = product.imgUrl;
        console.log('product in add: ', product);
        const action = addProduct({title, price, description, quantity, imgUrl}, categories);
        dispatch(action);
    }
});

export default connect(mapState, mapDispatch)(AddProduct);

