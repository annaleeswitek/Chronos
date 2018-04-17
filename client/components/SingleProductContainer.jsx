import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';

const mapStateToProps = function(state) {
  return {
    product: {
      id: 50000000,
      name: 'worst moment',
      imgUrl: 'img pending'
    }
    // product: state.products.reduce( (accum, currProduct) => productId === currProduct.id ? currProduct : {}, {})
  };
};

const mapDispatchToProps = function(dispatch) {
  return {

  };
};

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;
