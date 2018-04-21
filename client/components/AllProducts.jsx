'use strict';

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'; // What is Container used for? --GSS
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
import { AddProduct } from './index';

/* ---- Component ---- */
export class AllProducts extends Component {

  componentDidMount(){
    this.props.fetchProducts();
  }

    render() {
      let { products, user } = this.props;

        return (
            <div className="container" id="allProductsView">
                
                <Grid id="products">
                    <Row className="show-grid">
                {
                    products.map((product) => (
                        <Col sm={10} md={4}  key={product.id} id="singleProduct">
                          <Link to={`/products/${product.id}`}>

                            <img src={product.imgUrl} />
                            <h5>{product.title}</h5>
                            <h5>$ {product.price}</h5>
                          </Link>
                        </Col>
                    ))
                  }
                    </Row>
                </Grid>
                <section>
                {
                  user.isAdmin && <AddProduct />
                }
                </section>
            </div>
        );
    }
}

/* ---- Container ---- */
const mapState = state => ({
    products: state.products,
    user: state.user
});

const mapDispatch = dispatch => ({
    fetchProducts() {
      dispatch(fetchProducts());
    }
});

export default connect(mapState, mapDispatch)(AllProducts);

