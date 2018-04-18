import React, { Component } from 'react';


class AddProduct extends Component {
    render() {
        return (
        <div>
            <h3>Add New Product</h3>
                <form id="addProduct" onSubmit={this.props.addProduct}>
                    <label className="col-xs-2 control-label"><h5><b>Name</b></h5>
                            <input name="title" type="text"  placeholder="product name (required)" />
                    </label>

                    <label className="col-xs-2 control-label"><h5><b>Price</b></h5>
                            <input name="price" type="text"  placeholder="product price (required)" />
                    </label>

                    <label className="col-xs-2 control-label"><h5><b>Quantity</b></h5>
                            <input name="quantity" type="text"  placeholder="product quantity" />
                    </label>

                    <label className="col-xs-2 control-label"><h5><b>Description</b></h5>
                            <textarea name="description" type="text"  placeholder="product description" />
                    </label>

                     <label className="col-xs-2 control-label"><h5><b>Image</b></h5>
                            <textarea name="imgUrl" type="text"  placeholder="product image" />
                    </label>

                    <button type="submit" id="addButton">Add Product to Catalog</button>
                </form>
            </div>
        );
    }
}

export default AddProduct;

import { connect } from 'react-redux';
// at this point, we're in all products view and state.products = all products
import { addProduct } from '../store/addProduct';
import AddProduct from './AddProduct.jsx';

const mapStateToProps = function(state, ownProps) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = function(dispatch, ownProps){
    return {
        addProduct: function(event){
            event.preventDefault();
            // title and price need user friendly validations
            const title = event.target.title.value ? event.target.title.value : 'Fake Title'
            const price = event.target.price.value ? event.target.price.value : 0.00
            const description = event.target.description.value ? event.target.description.value : '';
            const quantity = event.target.quantity.value ? event.target.quantity.value : 0;
            const imgUrl = event.target.imgUrl.value ? event.target.imgUrl.value : '';
            
            const action = addProduct({title, price, description, quantity, imgUrl}, ownProps.history);
            dispatch(action);
        }
    }
}

const AddProductContainer = connect(mapStateToProps, mapDispatchToProps)(AddProduct);
export default AddProductContainer;

