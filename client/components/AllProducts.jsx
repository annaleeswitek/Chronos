import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {fetchProducts} from '../store/products';
import { connect } from 'react-redux';
import AddProductContainer from './AddProduct.jsx';
import { Container, Grid, Row, Col } from 'react-bootstrap';

class AllProducts extends Component {

    componentDidMount(){
        this.props.fetchProducts();
    }

    render() {
        let { products, user } = this.props;
        return (
            <div className="container" id="allProductsView">
                <Grid>
                    <Row className="show-grid">
                {
                    products.length > 0 ? products.map((product) => (
                        <Col sm={10} md={4}  key={product.id} id="singleProduct">
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                            <img src={product.imgUrl} />
                            <div>$ {product.price}</div>
                          </Link>
                        </Col>
                    )) : null
                }
                    </Row>
                </Grid>
                
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
