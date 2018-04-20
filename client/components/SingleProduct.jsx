import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditProduct from './EditProduct.jsx';
import { fetchOneProduct } from '../store/singleProduct';

/* ---- Component ---- */
class SingleProduct extends Component {

  componentDidMount(){
    this.props.fetchOneProduct(this.props.match.params.productId);
  }

  render(){
  const { user, product } = this.props;

    return (
      <div className="product">
        { product.id
          ?  <section id="product">
              <h3>{ product.title }</h3>
              <img src={ product.imgUrl } />
              <h4>{ product.price }</h4>
              <h4>{ product.description }</h4>
            </section>
          : <h2>Product Not Found</h2>
        }
        {
          user.isAdmin && <EditProduct />
        }
      </div>
    );
  }
}

/* ---- Container ---- */
const mapState = state => ({
  product: state.product,
  user: state.user
});

const mapDispatch = dispatch => ({
  fetchOneProduct(productId) {
    const thunkAction = fetchOneProduct(productId);
    dispatch(thunkAction);
  }
});

export default connect(mapState, mapDispatch)(SingleProduct);
