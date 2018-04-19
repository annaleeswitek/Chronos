import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadOneCategory } from '../store/categories';


/* ---- COMPONENT ---- */

class SingleCategory extends Component {

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

        {
          products && products.map(product => (<div key={product.id}>
            <section className="product">
              <img src={ product.imgUrl } />
            </section>
          </div>))
        }

      </div>
    );
  }
}

/* ---- CONTAINER ---- */

const mapStateToProps = state => {
  return {
    selectedCategory: state.selectedCategory
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    loadOneCategory(categoryId){
      const thunkAction = loadOneCategory(categoryId);
      dispatch(thunkAction);
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(SingleCategory);

export default Container;

