import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllCategories from './AllCategories.jsx';

class Navbar extends Component {

  render(){
    const { handleClick, isLoggedIn, categories } = this.props;
    return (
      <div>
        <h1>Chronos</h1>
        <nav>
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
          <Link to="/products">Catalog</Link>
          <AllCategories />
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
