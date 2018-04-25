'use strict';

import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const UserDropdown = props => {
  const { user } = props;

  return (
    <DropdownButton title={`Welcome, ${user.email}`} >
      <MenuItem eventKey="1">
        <Link to={`/users/${user.id}/order-history`}>View Order History</Link>
      </MenuItem>
    </DropdownButton>
  );
};

