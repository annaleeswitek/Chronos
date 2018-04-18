// uppercase and rename .jsx -- KHHW
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllCategories from './AllCategories.jsx'; // include container not this
import { loadCategories } from '../store/categories'; // don't forget to delete me

class Navbar extends Component {

  componentDidMount(){
    console.log('props in navbar', this.props);
    // this.props.loadCategories();
  }

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
              <Link to="/products">Products</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              { categories && categories.length /* since this is repeated I would just have it outside of this ternary -- KHWB*/
                ? <AllCategories />
                : null
              }

            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
              {/*
                categories && categories.length
                ?  <AllCategories />
                : null
              */}

            </div>
          )}
          <AllCategoriesContainer />
        </nav>
        <hr />
    </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    // categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    // loadCategories(){
    //   dispatch(loadCategories());
    // }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
