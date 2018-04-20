import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';

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
    const inputValue = this.state.inputValue.toLowerCase();
    const filteredProducts = this.props.products && this.props.products.filter(product => product.title.toLowerCase().match(inputValue));

    return (
      <div id="search-bar" onChange={this.showProducts}>
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
          {this.state.showProducts && filteredProducts.map(product => {
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
const mapState = state => ({
  products: state.products
});

const mapDispatch = dispatch => ({
  fetchProducts() {
    dispatch(fetchProducts());
  }
});

export default connect(mapState, mapDispatch)(Searchbar);

