'use strict';

import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import { fetchProducts } from '../store'
import { AddProduct, ProductToMap } from './index'

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
                  products.map((product) => <ProductToMap key={product.id} product={product} />)
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

