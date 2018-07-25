'use strict';

import React from 'react'

/* ---- Component ---- */
const Homepage = props => (
  <div id="home">
    <button onClick={props.enterSite} id="homeButton">
      <h1 id="homeTitle">Chronos</h1>
      <h3 id="homeCaption">Enter Site</h3>
    </button>
  </div>
)

export default Homepage
