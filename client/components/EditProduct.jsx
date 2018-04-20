import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProduct } from '../store/singleProduct';

class EditProduct extends Component {
  constructor(){
    super();
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(){

  }

  render() {
    const { product } = this.props;
    return (
      <div id="editProduct">
        <h3>Edit Product Information</h3>
        <form id="editProductForm" onSubmit={this.props.editProduct.bind(this, product)}>
          <label className="col-xs-2 control-label">
            <h5>
              <b>Name</b>
            </h5>
            <input name="title" type="text" placeholder="update product name" />
          </label>
          <label className="col-xs-2 control-label">
            <h5>
              <b>Price</b>
            </h5>
            <input name="price" type="text" placeholder="update product price" />
          </label>
          <label className="col-xs-2 control-label">
            <h5>
              <b>Quantity</b>
            </h5>
            <input name="quantity" type="text" placeholder="update product quantity" />
          </label>
          <label className="col-xs-2 control-label">
            <h5>
              <b>Description</b>
            </h5>
            <textarea name="description" type="text" placeholder="update product description" />
          </label>
          <label className="col-xs-2 control-label">
            <h5>
              <b>Image</b>
            </h5>
            <input name="imgUrl" type="text" placeholder="update product image" />
          </label>
          <button type="submit">Add Changes</button>
        </form>
      </div>
    );
  }
}


/* ---- Container ---- */
const mapStateToProps = state => ({product: state.product});

const mapDispatchToProps = dispatch => ({
  editProduct: (product, event) => {
    event.preventDefault();
    product.title = event.target.title.value || product.title;
    product.price = event.target.price.value || product.price;
    product.imgUrl = event.target.imgUrl.value || product.imgUrl;
    product.quantity = event.target.quantity.value || product.quantity;
    product.description = event.target.description.value || product.description;
    const action = editProduct(product);
    dispatch(action);
  }
});

const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProduct);
export default EditProductContainer;
