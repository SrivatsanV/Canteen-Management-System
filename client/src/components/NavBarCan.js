import React, { useEffect, useState } from 'react';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function NavBarUser() {
  const handleLogout = () => {
    console.log('Clear storage');
    localStorage.clear();
  };
  return (
    <div>
      <Navbar fixedToTop={true} className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <em>NITK NC</em>
          </Navbar.Heading>
          <Navbar.Divider />
          <Link
            to={`/canteen/orders`}
            style={{ textDecoration: 'none', color: '#f5f8fa' }}
          >
            <Button
              className="bp3-minimal"
              icon="home"
              text="Home"
              style={{ textDecoration: 'none' }}
            />
          </Link>
          <Link
            to={`/canteen/orders`}
            style={{ textDecoration: 'none', color: '#f5f8fa' }}
          >
            <Button
              className="bp3-minimal"
              icon="shopping-cart"
              text="Orders"
            />
          </Link>
          <Link
            to={`/canteen/menu`}
            style={{ textDecoration: 'none', color: '#f5f8fa' }}
          >
            <Button className="bp3-minimal" icon="shopping-cart" text="Menu" />
          </Link>
          <Link
            to={`/canteen`}
            style={{ textDecoration: 'none', color: '#f5f8fa' }}
          >
            <Button
              className="bp3-minimal"
              icon="power"
              text="Logout"
              onClick={handleLogout}
            />
          </Link>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}
