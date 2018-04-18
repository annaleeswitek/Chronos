import React, { Component } from 'react'

export default class EditProduct extends Component {
    
        render() {
                const { product } = this.props;
                return (
                        <div id="editProduct">
                                <h3>Edit Product Information</h3>
                                <form  id="editProductForm" onSubmit={this.props.editProduct.bind(this, product)}>
                                        <label className='col-xs-2 control-label'><h5><b>Name</b></h5>
                                                <input name='title' type="text"  placeholder='update product name' />
                                        </label>

                                        <label className='col-xs-2 control-label'><h5><b>Price</b></h5>
                                                <input name='price' type="text"  placeholder='update product price' />
                                        </label>

                                        <label className='col-xs-2 control-label'><h5><b>Quantity</b></h5>
                                                <input name='quantity' type="text"  placeholder='update product quantity' />
                                        </label>

                                        <label className='col-xs-2 control-label'><h5><b>Description</b></h5>
                                                <textarea name='description' type="text"  placeholder='update product description' />
                                        </label>

                                        <label className='col-xs-2 control-label'><h5><b>Image</b></h5>
                                                <input name='imgUrl' type="text"  placeholder='update product image' />
                                        </label>

                                        <button type="submit">Add Changes</button>
                                </form>
                        </div>
                )
        }
}

import { connect } from 'react-redux';
// at this point, we're in all products view and state.products = all products
import { editProduct } from '../store/editProduct';
import EditProduct from './EditProduct.jsx';

const mapStateToProps = function(state, ownProps) {
    return {
        product: state.product
    }
}

const mapDispatchToProps = function(dispatch, ownProps){
    return {
        editProduct: function(product, event){
            event.preventDefault();
            product.title = event.target.title.value ? event.target.title.value : product.title;
            product.price = event.target.price.value ? event.target.price.value : product.price;
            product.imgUrl = event.target.imgUrl.value ? event.target.imgUrl.value : product.imgUrl;
            product.quantity = event.target.quantity.value ? event.target.quantity.value: product.quantity;
            product.description = event.target.description.value ? event.target.description.value : product.description;
            const action = editProduct(product);
            dispatch(action);
        }, 

    }
}

const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProduct);
export default EditProductContainer;

