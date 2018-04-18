import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditProductContainer from './EditProduct.jsx';
import { fetchOneProduct } from '../store/singleProduct';

/* ---- COMPONENT ---- */

class SingleProduct extends Component {
  
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
          : <h2>Product Not Found</h2>
        }
           
        {
          user.isAdmin
          ? <EditProductContainer />
          : null
        }
       
      </div>
    );
  }
}

/* ---- CONTAINER ---- */

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


