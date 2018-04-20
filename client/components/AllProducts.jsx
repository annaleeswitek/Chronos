import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import AddProductContainer from './AddProduct.jsx';
import { Container, Grid, Row, Col } from 'react-bootstrap';
import SearchbarContainer from './Searchbar.jsx';

/* ---- Component ---- */
export class AllProducts extends Component {

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
                  user.isAdmin && <AddProductContainer />
                }
                </section>
                <SearchbarContainer />
            </div>
        );
    }
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
