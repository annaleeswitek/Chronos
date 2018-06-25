'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { auth } from '../store';

/* ---- Component ---- */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id="allLoginSignupOptions">
      <div id="loginSignup">
        <form onSubmit={handleSubmit} name={name} id="loginSignupForm">
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
      <a href="/auth/google" id="OAuth">{displayName} with Google</a>
    </div>
  );
};

/* ---- Container ---- */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
});

const mapDispatch = dispatch => ({
  handleSubmit(event) {
    event.preventDefault();
    const formName = event.target.name;
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(auth(email, password, formName));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/* ---- Prop Types ---- */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
