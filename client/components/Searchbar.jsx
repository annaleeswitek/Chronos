'use strict';

import React, { Component } from 'react'

import { TextField, ControlLabel } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchProducts } from '../store'

/* ---- Container ---- */
class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      showProducts: false
    };
    this.handleChange = this.handleChange.bind(this)
    this.showProducts = this.showProducts.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({ inputValue: value })
  }

  showProducts() {
    this.setState({ showProducts: !this.state.showProducts })
  }

  render() {
    const inputValue = this.state.inputValue.toLowerCase()
    const filteredProducts = this.props.products && this.props.products.filter(product => product.title.toLowerCase().match(inputValue))
  
    return (
      <div id="search-bar">
        <form>
          <TextField
            onChange={this.handleChange}
            value={inputValue}
            className="Form-control"
            placeholder="search"
            style={{
              width: '150%'
            }}
          />
          
        </form>
        <div className="list-group">
          {this.state.inputValue ? filteredProducts.map(product => {
            return (
              <div className="list-group-item" key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </div>
            )
          }) : null }
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

