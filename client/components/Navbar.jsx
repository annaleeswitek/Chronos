import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllCategories from './AllCategories.jsx';
import { loadCategories } from '../store/categories';

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      showCategories: false
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){
    this.setState({ showCategories: !this.state.showCategories })
  }

  render(){
    const { handleClick, isLoggedIn } = this.props;
    return (
      <div>
        <h1>Chronos</h1>
        <nav id="navBar">
          {isLoggedIn ? (
            <div id="isLoggedOut">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div id="isLoggedOut">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          <Link to="/products">Catalog</Link>
          <a href="#" onClick={this.handleClick}>Categories</a>
          {
          this.state.showCategories && <AllCategories />
            
        }
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
