import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/* ---- Component ---- */
export const UserHome = (props) => {
  const {email} = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
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
