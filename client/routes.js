'use strict';

import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Cart, Checkout, AllCategories, SingleCategory, Homepage, Login, Signup, UserHome, AllProducts, SingleProduct } from './components';
import { me } from './store';

/* ---- Component ---- */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/categories" component={AllCategories} />
        <Route path="/categories/:categoryId" component={SingleCategory} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        {/* Routes placed here are only available after logging in */}
        {
          isLoggedIn && <Route path="/home" component={UserHome} />
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/* ---- Container ---- */
const mapState = state => ({
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
  loadInitialData () {
    dispatch(me());
  }
});

export default withRouter(connect(mapState, mapDispatch)(Routes));

/* ---- Prop Types ---- */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

