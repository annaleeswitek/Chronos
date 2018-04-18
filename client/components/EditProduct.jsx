import React, { Component } from 'react'

export default class EditProduct extends Component {
    // WHAT?!?!?! 8 spaces? -- KHWB
    // consider prettier plugin -- KHWB
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
