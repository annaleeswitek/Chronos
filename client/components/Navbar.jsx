import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../store';
import { AllCategories } from './index';

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
    const { handleClick, isLoggedIn, user } = this.props;
    console.log('this.props in Navbar:', this.props);

    return (
      <div id="navBarAll">
        <Link to="/" id="navBarName">
          <h1>Chronos</h1>
        </Link>
        <nav id="navBar" onMouseLeave={this.showCategories}>
          {isLoggedIn ? (
            <div id='loggedIn'>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/login" onClick={handleClick}>Logout</Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          <div id="alwaysShow">
            <Link to="/products" onMouseOver={this.showCategories}>
              Catalog
            </Link>
            <div id="categoriesInNav">
              {this.state.showCategories && <AllCategories />}
            </div>
          </div>
           {/* maybe make this a link to user's order history/cart? */}
           { isLoggedIn && <Link to="/home">Hello {user.email}</Link>}
        </nav>
      </div>
    );
  }
}

/* ---- Container ---- */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  categories: state.categories, 
  user: state.user
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
