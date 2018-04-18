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
            <div id="allProducts">
                <section>
                {
                    products.length > 0 ? products.map((product) => (
                        <div key={product.id} product={product}>
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                            <img src={product.imgUrl} />
                            <div>$ {product.price}</div>
                          </Link>
                        </div>
                    )) : null
                }
                </section>
                
                <section>
                {
                    user.isAdmin
                    ? <AddProductContainer/>
                    : null
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
