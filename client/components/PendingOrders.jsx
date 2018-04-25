import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPendingOrders } from '../store';

/* ---- Component ---- */
export class PendingOrders extends Component {
  componentDidMount() {
    this.props.getPendingOrders();
  }
  render() {
    const { orderHistory } = this.props;
    return (
      <div>{
        orderHistory && orderHistory.map(order => (<div key={order.id}> {order.userId}</div>
        ))
      }</div>
    )
  }
}

/* ---- Container ---- */
const mapState = state => ({
  orderHistory: state.orderHistory
});

const mapDispatch = dispatch => ({
  getPendingOrders() {
    dispatch(getPendingOrders());
  }
});