import React, { Component } from 'react';
import { Clearfix, MenuItem } from 'react-bootstrap';

const UserDropdown = () => {
  return (
  <Clearfix>
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem divider />
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem title="See? I have a title.">link with title</MenuItem>
      <MenuItem eventKey={1} href="#someHref">
        link that alerts
      </MenuItem>
    </ul>
  </Clearfix>
  )
}

export default UserDropdown;
