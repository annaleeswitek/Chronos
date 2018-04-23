'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* ---- Component ---- */
export const Homepage = () => {
  return (
    <div id="home">
    <title id="homeTitle">
    <Link to="/products">
    ⏳
    </Link>
    </title>
    </div>
  )
}

