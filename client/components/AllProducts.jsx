import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {fetchProducts} from '../store/products';
import { connect } from 'react-redux';
import AddProductContainer from './AddProduct.jsx';

class AllProducts extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        let { products, user } = this.props;
        return (
            <div id="allProducts" className="container">
                <div className="row">
                {
                    products.length > 0 ? products.map((product) => (
                        <div key={product.id} product={product} className="col-sm">
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                            <img src={product.imgUrl} />
                            <div>$ {product.price}</div>
                          </Link>
                        </div>
                    )) : null
                }

                <section>
                {
                    user.isAdmin &&
                    <AddProductContainer />
                }
                </section>

            </div>
        );
    }
}

const mapStateToProps = function(state){
    return {
        products: state.products,
        user: state.user
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        fetchProducts: function(){
            dispatch(fetchProducts());
        }
    };
};

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(AllProducts);
export default AllProductsContainer;
