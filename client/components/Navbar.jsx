import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import AllCategories from "./AllCategories.jsx";

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
          <h1>Chronos</h1>
        </Link>
        <nav id="navBar" onMouseLeave={this.showCategories}>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
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
        </nav>
      </div>
    );
  }
}

/* ---- Container ---- */
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  handleClick() {
    dispatch(logout());
  }
});

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default NavbarContainer;

/* ---- Prop Types ---- */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
