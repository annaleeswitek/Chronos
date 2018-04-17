import { connect } from 'react-redux';
import SingleProduct from './SingleProduct.jsx';

const mapStateToProps = function(state, ownProps) {

  const productId = Number(ownProps.match.params.productId);

  return {
    // product: {
    //   id: 50000000,
    //   name: 'worst moment',
    //   imgUrl: 'img pending'
    // }
    product: state.products.find( product => product.id === productId) || { name: 'dummy product' }
  };
};

// const mapDispatchToProps = function(dispatch) {
//   return {

//   };
// };

const SingleProductContainer = connect(mapStateToProps, null)(SingleProduct);

export default SingleProductContainer;
