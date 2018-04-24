'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cart } from './Cart.jsx';
import { getOrders, loadCart, updateCart } from '../store';

/* ---- Component ---- */
export const AllOrders = props => {
  // const { orderHistory, user } = props;
  console.log('load', Cart)
  // console.log('props', props)
      return (
        <h1>
          HELLO WORLD
        </h1>
    );
};

// /* ---- Container ---- */
// const mapStateToProps = state => ({
//   orderHistory: state.orderHistory,
//   user: state.user
// });

// const mapDispatchToProps = dispatch => ({
//   getOrders(orderId){
//     dispatch(getOrders(orderId));
//   }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
