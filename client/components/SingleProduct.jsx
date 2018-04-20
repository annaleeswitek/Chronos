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
      <div className="product">
        { product.id
          ?  <section id="product">
              <div id="allButDesc">
                <h3>{ product.title }</h3>
                <img src={ product.imgUrl } />
                <h4>${ product.price }</h4>
                <a href="#">Add To Cart</a>
              </div>
              <div id="description">
                <h4>{ product.description }</h4>
                
              </div>
            </section>
          : <h2>Product Not Found</h2>
        }
        <div id="editProduct">
        {
          //passing location as a prop here because i need to make sure that edit product has access to product
          user.isAdmin && <EditProductContainer location={location}/>
        }
        </div>
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

