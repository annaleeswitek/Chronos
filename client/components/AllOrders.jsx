import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../store';

/* ---- Component ---- */
const AllOrders = () => {
  const { orderHistory, user } = this.props;
      return (
        <div>
        {this.props.user.name}
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
