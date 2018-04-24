'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout, loadCart } from '../store';
import { AllCategories, Searchbar } from './index';

/* ---- Component ---- */
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showCategories: false
    };
    this.showCategories = this.showCategories.bind(this);
  }

  componentDidMount(){
    this.props.loadCart();
  }

  showCategories() {
    this.setState({ showCategories: !this.state.showCategories });
  }

  render() {
    const { handleClick, isLoggedIn, productsInCart } = this.props;
    console.log('this.props in Navbar:', this.props);
    const productQuantity = 
      productsInCart.length && productsInCart.map(product => product.lineItem.quantity)
                                            .reduce((acc, val) => (acc + val), 0);
    return (
      <div id="navBarAll">
        <Link to="/" id="navBarName">
        <div id="chronosName">
          <h1>Chronos</h1>
          </div>
        </Link>
          <span id="navBarCart">
          <Link to="/cart">🛒 {productQuantity}</Link>
        </span>
          <Searchbar />
        <nav id="navBar" onMouseLeave={this.showCategories}>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">home</Link>
              <a href="#" onClick={handleClick}>
                logout
              </a>
              
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">login</Link>
              <Link to="/signup">sign up</Link>
            </div>
          )}
          <div id="alwaysShow">
            <Link to="/products" onMouseOver={this.showCategories}>
              catalog
            </Link>
            <div id="categoriesInNav">
              {this.state.showCategories && <AllCategories />}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

/* ---- Container ---- */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  categories: state.categories, 
  productsInCart: state.cart
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  }, 
  loadCart() {
    console.log('loading cart in navbar')
    dispatch(loadCart());
  }
});

export default connect(mapState, mapDispatch)(Navbar);

/* ---- Prop Types ---- */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
