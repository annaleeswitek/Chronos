import React, { Component } from 'react';
import {fetchProducts} from '../store/products';

export default class AllProducts extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        console.log('props', this.props);
        let { products } = this.props;
        return (
            <div>
                {
                    products.length > 0 ? products.map((product, index) => (
                        <div key={index}>{product.title}</div>
                    )) : null
                }
            </div>
        );
    }
}
