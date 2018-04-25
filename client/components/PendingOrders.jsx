import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../store';

/* ---- Component ---- */
class PendingOrders extends Component {
  componentDidMount(){
    this.props.loadOrders()
  }

  render(){
    const { orderHistory } = this.props;
    return (
      <div>
      { orders && orders.map(order => (
        <div key={order.id}>{order.id}</div>
      )) }
      </div>
    )
  }
}

/* ---- Container ---- */

const mapStateToProps = state => ({
  orderHistory: state.orderHistory
});

const mapDispatchToProps = dispatch => ({
  loadOrders(){
    dispatch
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders);