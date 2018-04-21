import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* ---- Component ---- */
export const UserHome = (props) => {
  const {email} = props;

  return (
    <div id="homePage">
      <h3><b>Welcome, {email}</b></h3>
      <img src={require('../../public/images/tree-one.png')}/>
    </div>
  );
};

/* ---- Container ---- */
const mapState = state => ({
  email: state.user.email
});

export default connect(mapState)(UserHome);

/* ---- Prop Types ---- */
UserHome.propTypes = {
  email: PropTypes.string
};
