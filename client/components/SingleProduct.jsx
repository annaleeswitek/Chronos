import React from 'react';

export default function SingleProduct (props) {

  const product = props.product;

  return (
    <div className="product">
      <h3>{ product.title }</h3>
      <img src={ product.imgUrl } />
      <p>{product.description}</p>
    </div>
  );
}

