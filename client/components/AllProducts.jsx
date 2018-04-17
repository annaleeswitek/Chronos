import React, { Component } from 'react'
import store from '../store';

export default class AllProducts extends Component {
    constructor(){
        super();
        this.state = store.getState()
    }

    componentDidMount(){
        this.props.getAllProducts();
    }

    render() {
        const { products } = this.props;
        return (
        <div>
            {   products.length > 0
                ? products.map((product, index) => (
                    <div key={index}>{product.name}</div>
                ))
                : null
                
            }
        </div>
        )
  }
}
