import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllCategories from './AllCategories.jsx';

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      showCategories: false
    }
    this.showCategories = this.showCategories.bind(this);
  }

  showCategories(){
    this.setState({ showCategories: !this.state.showCategories });
  }

  render(){
    const { handleClick, isLoggedIn, categories } = this.props;
    return (
      <div id="navBarAll">
        <h1 id="navBarName">Chronos</h1>
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
         <div id="navBarAll">
            <Link to="/products" onMouseOver={this.showCategories}>Catalog</Link>
            {this.state.showCategories && <AllCategories />}
          </div>
        </nav>
        <hr />
    </div>
    );
  }
}


/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    loadCategories(){
      dispatch(loadCategories());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
