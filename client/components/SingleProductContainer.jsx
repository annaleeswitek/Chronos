import { connect } from 'react-redux';
import SingleProduct from './SingleProduct.jsx';

const mapStateToProps = function(state, ownProps) {

  const productId = Number(ownProps.match.params.productId);

  return {
    product: state.product
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchProduct: function(productId){
      
    }
  };
};

const SingleProductContainer = connect(mapStateToProps, null)(SingleProduct);

export default SingleProductContainer;
