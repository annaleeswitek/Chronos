import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import AddProductContainer from './AddProduct.jsx';
import { Container, Grid, Row, Col } from 'react-bootstrap';
import { Searchbar } from './SearchProducts.jsx';

/* ---- Component ---- */
export class AllProducts extends Component {

  componentDidMount(){
    this.props.fetchProducts();
  }

    render() {
      let { products, user } = this.props;
    
        return (
<<<<<<< HEAD
          <div className="container" id="allProductsView">
            <Grid>
            <Row className="show-grid">
            {
                products.map((product) => (
                <Col sm={10} md={4}  key={product.id} id="singleProduct">
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.title}</h3>
                    <img src={product.imgUrl} />
                    <div>$ {product.price}</div>
                  </Link>
                </Col>
            ))
            }
            </Row>
            </Grid>
          <section>
            {
              user.isAdmin && <AddProductContainer />
            }
          </section>
        </div>
    );
  }
=======
            <div className="container" id="allProductsView">
                <Grid>
                    <Row className="show-grid">
                {
                    products.map((product) => (
                        <Col sm={10} md={4}  key={product.id} id="singleProduct">
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                            <img src={product.imgUrl} />
                            <div>$ {product.price}</div>
                          </Link>
                        </Col>
                    ))
                }
                    </Row>
                </Grid>

                <section>
                {
                    user.isAdmin && <AddProductContainer />
                }
                </section>

            </div>
        );
    }
>>>>>>> master
}

/* ---- Container ---- */
const mapStateToProps = state => ({
    products: state.products,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
});

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(AllProducts);
export default AllProductsContainer;
