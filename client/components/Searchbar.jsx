import React, { Component } from "react";
import AllProductsContainer /* , { AllProducts } */ from "./AllProducts.jsx";
import { fetchProducts } from "../store/products";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      showProducts: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.showProducts = this.showProducts.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ inputValue: value });
  }

  showProducts() {
    this.setState({ showProducts: !this.state.showProducts });
  }

  render() {
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products
      ? this.props.products.filter(product => product.title.match(inputValue))
      : [];

    return (
      <div>
        <span>Search Product</span>
        <form className="form-group">
          <input
            onChange={this.handleChange}
            value={inputValue}
            className="form-control"
            placeholder="What Are You Looking For?"
          />
        </form>
        <div className="list-group">
          {filteredProducts.map(product => {
            return (
              <div className="list-group-item" key={product.id}>
                <Link to={`/products/${product.id}`} onChange={this.showProducts}>{product.title}</Link>
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

const SearchbarContainer = connect(mapStateToProps, mapDispatchToProps)(
  Searchbar
);
export default SearchbarContainer;
