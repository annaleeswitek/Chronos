import { connect } from 'react-redux';
import SingleProduct from './SingleProduct.jsx';
import { fetchOneProduct } from '../store/singleProduct.js';

const mapStateToProps = function(state, ownProps) {
  return {
    product: state.product
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
