import React, { Component } from 'react';
import EditProductContainer from './EditProductContainer.jsx';
export default class SingleProduct extends Component {
  
  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user } = this.props;

    const product = Object.keys(this.props.product).length > 0
                    ? this.props.product
                    : undefined;

    return (
      <div id='singleProduct'>
      
        { product 
          ?  <section className="product">
              <h3>{ product.title }</h3>
              <img src={ product.imgUrl } />
            </section>
          : null
        }
           
        {
          user && user.isAdmin
          ? <EditProductContainer />
          : null
        }
       
      </div>
    );
  }
}

import { connect } from 'react-redux';
import SingleProduct from './SingleProduct.jsx';
import { fetchOneProduct } from '../store/singleProduct.js';

const mapStateToProps = function(state, ownProps) {
  return {
    product: state.product, 
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchOneProduct: function(productId){
      const thunkAction = fetchOneProduct(productId);
      dispatch(thunkAction);
    } 
  };
};

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;


