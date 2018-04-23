'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../store';

/* ---- Component ---- */
export const AllOrders = () => {
  const productStatus = [
    { status: 'pending' },
    { status: 'completed' },
    { status: 'cancelled' }
  ];

  console.log('getOrders', getOrders)
 
  const { orderHistory, user } = this.props;
      return (
        <div>
          HELLO WORLD
        {
          productStatus.map(oneStatus => oneStatus.status)
        }
        </div>
    );
};

/* ---- Container ---- */
const mapStateToProps = state => ({
  orderHistory: state.orderHistory,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getOrders(user){
    dispatch(getOrders(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
