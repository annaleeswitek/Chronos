import { connect } from 'react-redux';
import SingleProduct from './SingleProduct.jsx';
import { fetchOneProduct } from '../store/singleProduct.js';

const mapStateToProps = function(state, ownProps) {
  return {
    product: state.product, // filter all products based on ownProps.match.params.id -- KHWB 
    user: state.user
  };
};

// why make a request to the back if we don't need it? -- KHWB
  // if people are updating products often, then this makes a lot sense -- KHWB
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
