import React, { Component } from 'react';


export default class SingleCategory extends Component {

  componentDidMount () {
    const categoryId = this.props.match.params.categoryId;
    this.props.loadOneCategory(categoryId);
  }

  render () {
    const { selectedCategory } = this.props;
    const products = selectedCategory.products;

    return (
      <div>
        { selectedCategory
          ? <h1>{selectedCategory.name}</h1>
          : null
        }

        { products && products.map(product => (<div key={product.id}>{product.title}</div>))
        }
      </div>


    );
  }
}
