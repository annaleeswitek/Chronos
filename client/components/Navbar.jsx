'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../store';
import { AllCategories, UserDropdown, Searchbar } from './index';

/* ---- Component ---- */
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showCategories: false
    };
    this.showCategories = this.showCategories.bind(this);
  }

  showCategories() {
    this.setState({ showCategories: !this.state.showCategories });
  }

  render() {
    const { handleClick, isLoggedIn } = this.props;
    console.log('this.props in Navbar:', this.props);

    return (
      <div id="navBarAll">
        <Link to="/" id="navBarName">
        <div id="chronosName">
          <h1>Chronos</h1>
          </div>
        </Link>
          <span id="navBarCart">
          <Link to="/cart">🛒</Link>
        </span>
          <Searchbar />
        <nav id="navBar" onMouseLeave={this.showCategories}>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">home</Link>
              <a href="#" onClick={handleClick}>
                Logout
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
            <div><UserDropdown /></div>
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
  categories: state.categories
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Navbar);

/* ---- Prop Types ---- */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
