import React, { Component } from "react";
import AllProductsContainer /* , { AllProducts } */ from "./AllProducts.jsx";
import { fetchProducts } from "../store/products";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ inputValue: value });
  }

  render() {
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products && this.props.products.filter(product => product.title.match(inputValue))

    return (
      <div id="search-bar">
        <span>Search Product</span>
        <Form >
          <FormControl
            onChange={this.handleChange}
            value={inputValue}
            className="Form-control"
            placeholder="What Are You Looking For?"
          />
        </Form>
        <div className="list-group">
          {filteredProducts.map(product => {
            return (
              <div className="list-group-item" key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

/* ---- Container ---- */
const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  fetchProducts() {
    dispatch(fetchProducts());
  }
});

const SearchbarContainer = connect(mapStateToProps, mapDispatchToProps)(Searchbar);
export default SearchbarContainer;
