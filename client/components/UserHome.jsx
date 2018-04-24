'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders } from '../store';

/* ---- Component ---- */
export class UserHome extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.user);
  }

  render() {
  const { email, user, orders } = this.props;
  console.log('user and orders', user, orders);
  return (
    <div>
      {orders && orders.map(order => (
        <div id="viewOrder">
          <h2>
            {order.status}
          </h2>
          <ul>
          {order.products.map(product => (
            <li>
              {`Product: ${product.title}, Unit Price: ${product.price}, Quantity: ${product.lineItem.quantity}`}
            </li>
          ))}
          </ul>
        </div>
      ))}
      <h3>Welcome, {email}</h3>
    </div>
  );
}
};

/* ---- Container ---- */
const mapState = state => ({
  user: state.user,
  email: state.user.email,
  orders: state.orderHistory
});

const mapDispatch = dispatch => ({
  fetchOrders(user) {
    dispatch(getOrders(user))
  }
})

export default connect(mapState, mapDispatch)(UserHome);

/* ---- Prop Types ---- */
UserHome.propTypes = {
  email: PropTypes.string
};
