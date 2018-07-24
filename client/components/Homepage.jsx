'use strict';

import React, { Component } from 'react'
import { Button } from '@material-ui/core'

/* ---- Component ---- */
export default class Homepage extends Component {
  constructor(){
    super()
    this.state = {
      showLogin: false
    }
    this.showLogin = this.showLogin.bind(this)
  }

  showLogin(){
    this.setState(prevState => {
      return { showLogin: !prevState.showLogin }
    })
  }
  render(){
    return (
      <div id="home">
        <Button onClick={this.showLogin}>
          <h1 id="homeTitle">Chronos</h1>
        </Button>
      </div>
    )
  }
}




