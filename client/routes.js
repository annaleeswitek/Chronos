'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, UserHome, Homepage, PendingOrders } from './components';
import { me } from './store';

import AllCategoriesContainer from './components/AllCategories.jsx';
import AllProductsContainer from './components/AllProducts.jsx';
import SingleProductContainer from './components/SingleProduct.jsx';
import SingleCategoryContainer from './components/SingleCategory.jsx';
import CartContainer from './components/Cart.jsx';

/* ---- Component ---- */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const {isLoggedIn, user} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/categories" component={AllCategoriesContainer} />
        <Route path="/products/:productId" component={SingleProductContainer} />
        <Route exact path="/categories/:categoryId" component={SingleCategoryContainer} />
        <Route exact path="/products" component={AllProductsContainer} />
        <Route exact path="/cart" component={CartContainer} />
        {/* Routes placed here are only available after logging in */}
        {
          isLoggedIn && <Route path="/home" component={UserHome} />

        }
        {/* Routes placed here are only available in logged in admin view */}
        {
          user.isAdmin &&
          <Route path="/orders/pending-orders" component={PendingOrders} />
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
    isLoggedIn: !!state.user.id, 
    user: state.user
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

