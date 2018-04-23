import React, { Component } from 'react'
import { connect } from 'react-redux';

class AllOrders extends Component {

  render() {
    const { orderHistory, user } = this.props;
    return (
      <div>
        {state.user.name}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderHistory: state.orderHistory, 
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getOrders(user){
    dispatch(getOrders(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
