// to be rendered in all products view
import React, { Component } from 'react'


class AddProduct extends Component {

    render() {
        
        return (
            <div>
                <h3>Add New Product</h3>
                <form id="addProduct" onSubmit={this.props.addProduct}>
                    <label className='col-xs-2 control-label'><h5><b>Name</b></h5>
                            <input name='title' type="text"  placeholder='product name (required)' />
                    </label>

                    <label className='col-xs-2 control-label'><h5><b>Price</b></h5>
                            <input name='price' type="text"  placeholder='product price (required)' />
                    </label>

                    <label className='col-xs-2 control-label'><h5><b>Quantity</b></h5>
                            <input name='quantity' type="text"  placeholder='product quantity' />
                    </label>

                    <label className='col-xs-2 control-label'><h5><b>Description</b></h5>
                            <textarea name='description' type="text"  placeholder='product description' />
                    </label>

                     <label className='col-xs-2 control-label'><h5><b>Image</b></h5>
                            <textarea name='imgUrl' type="text"  placeholder='product image' />
                    </label>

                    <button type='submit' id="addButton">Add Product to Catalog</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;

