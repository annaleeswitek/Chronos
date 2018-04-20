import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'; // does not work if form is uncontrolled --> for now
import { connect } from 'react-redux';
import { addProduct } from '../store';

/* ---- Component ---- */
const AddProduct = () => ({

  render() {
    return (
      <div id="addProductFormPage">
        <h3>Add New Product</h3>
          <form  onSubmit={this.props.addProduct} id="addProductForm">
            <label className="col-xs-2 control-label"><h5><b>Name</b></h5>
            <input name="title" type="text"  placeholder="product name (required)" />
            </label>

            <label className="col-xs-2 control-label"><h5><b>Price</b></h5>
            <input name="price" type="text"  placeholder="product price (required)" />
            </label>

            <label className="col-xs-2 control-label"><h5><b>Quantity</b></h5>
            <input name="quantity" type="text"  placeholder="product quantity" />
            </label>

            <label className="col-xs-2 control-label"><h5><b>Image</b></h5>
            <input name="imgUrl" type="text"  placeholder="product image" />
            </label>

            <label className="col-xs-2 control-label"><h5><b>Description</b></h5>
            <textarea name="description" type="text"  placeholder="product description" />
            </label>

            <button type="submit" id="addButton">Add Product to Catalog</button>
          </form>
      </div>
      );
    }
});

/* ---- Container ---- */
const mapState = state => ({
    products: state.products
});

const mapDispatch = (dispatch, ownProps) => ({
    addProduct: event => {
        event.preventDefault();
        const title = event.target.title.value || 'Product Name';
        const price = event.target.price.value || 0.00;
        const description = event.target.description.value || '';
        const quantity = event.target.quantity.value;
        const imgUrl = event.target.imgUrl.value;

        const action = addProduct({title, price, description, quantity, imgUrl}, ownProps.history);
        dispatch(action);
    }
});

export default connect(mapState, mapDispatch)(AddProduct);

