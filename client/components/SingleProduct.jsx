import React, { Component } from 'react';

export default class SingleProduct extends Component {
  
  componentDidMount(){
    this.props.fetchProduct(this.props.match.params.productId);
  }

  render(){
    const product = Object.keys(this.props.product).length > 0
                    ? this.props.product
                    : null;

    return (
      <div className="product">
        <h3>{ product.title }</h3>
        <img src={ product.imgUrl } />
      </div>
    );
  }
  
}

