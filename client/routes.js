import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, UserHome } from './components';
import { me } from './store';

import AllCategoriesContainer from './components/AllCategories.jsx';
import AllProductsContainer from './components/AllProducts.jsx';
import SingleProductContainer from './components/SingleProduct.jsx';
import SingleCategoryContainer from './components/SingleCategory.jsx';

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
        <Route path="/login" component={Login} />
        <Route path="/auth/login" component={UserHome}/>
        <Route path="/signup" component={Signup} />
        <Route exact path="/categories" component={AllCategoriesContainer} />
        <Route path="/products/:productId" component={SingleProductContainer} />
        <Route exact path="/categories/:categoryId" component={SingleCategoryContainer} />
        <Route exact path="/products" component={AllProductsContainer} />
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/* ---- Prop Types ---- */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

