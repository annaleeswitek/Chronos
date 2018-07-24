import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { Navbar, Homepage } from './components';
import Routes from './Routes.jsx';
import { me } from './store'

class App extends Component {
  constructor(){
    super()
    this.state = {
      clickedEnter: false
    }
    this.enterSite = this.enterSite.bind(this)
  }

  componentDidMount () {
    this.props.loadInitialData();
  }

  enterSite(){
    this.setState(prevState => {
      return { clickedEnter: !prevState.clickedEnter }
    })
  }

  render(){
    const { clickedEnter } = this.state
    return (
      <div>
      { !clickedEnter && <Homepage enterSite={this.enterSite}/>}
      { clickedEnter &&
        <div>
        <Navbar />
        <Routes />
        </div>
      }
        
      </div>
    );
  }
}
  




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

export default withRouter(connect(mapState, mapDispatch)(App));
