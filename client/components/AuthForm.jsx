'use strict';

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

import { auth } from '../store'

/* ---- Component ---- */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div id="allLoginSignupOptions">
      <div id="loginSignup">
        <form
          onSubmit={handleSubmit}
          name={name}
          id="loginSignupForm"
        >
          <div>
            <TextField
              name="email"
              type="text"
              id="emailInput"
              placeholder="email"
              style={{
                      fontFamily: 'Lato, sansSerif',
                      fontSize: '4em',
                      margin: '-0.5vh 2vw 0 0',
                      width: '20vw'
                }}
              />
          </div>
          <div>
            <TextField 
              name="password"
              type="password"
              id="passwordInput"
              placeholder="password"
              style={{
                      fontFamily: 'Lato, sansSerif',
                      fontSize: '4em',
                      margin: '-0.5vh 2vw 0 0',
                      width: '20vw'
                }}
              />
          </div>
          <div>
            <Button
              type="submit"
              style={{
                    fontFamily: 'Lato, sansSerif',
                    fontSize: '1em',
                    marginTop: '-0.5vh'
                }}
              >
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
      <Button
        href="/auth/google"
        id="OAuth"
        style={{
                fontFamily: 'Lato, sansSerif',
                fontSize: '1em',
                margin: '0 0 0 -10vw'
          }}
      >
        {displayName} with Google
      </Button>
    </div>
  );
};

/* ---- Container ---- */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
})

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
})

const mapDispatch = dispatch => ({
  handleSubmit(event) {
    event.preventDefault();
    const formName = event.target.name;
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(auth(email, password, formName));
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/* ---- Prop Types ---- */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
