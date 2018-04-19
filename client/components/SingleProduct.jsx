import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditProductContainer from './EditProduct.jsx';
import { fetchOneProduct } from '../store/singleProduct';

/* ---- Component ---- */
class SingleProduct extends Component {

  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user, product } = this.props;

    return (
      <div id="singleProduct">
        { product.id
          ?  <section className="product">
              <h3>{ product.title }</h3>
              <img src={ product.imgUrl } />
            </section>
          : <h2>Product Not Found</h2>
        }
        {
          user.isAdmin && <EditProductContainer />
        }
      </div>
    );
  }
}

/* ---- Container ---- */
const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchOneProduct: productId => {
    const thunkAction = fetchOneProduct(productId);
    dispatch(thunkAction);
  }
});

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default SingleProductContainer;

