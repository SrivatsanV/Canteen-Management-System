import React, { useEffect, useState } from 'react';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function NavBarUser({ view }) {
  useEffect(() => {
    console.log(view);
  });
  const handleLogout = () => {
    console.log('Clear storage');
    localStorage.clear();
  };
  return (
    <div>
      <Navbar fixedToTop={true} className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>NITK NC</Navbar.Heading>
          <Navbar.Divider />
          {view ? (
            <>
              <Link
                to={`/canteenlist`}
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
                to={`/user/orders`}
                style={{ textDecoration: 'none', color: '#f5f8fa' }}
              >
                <Button
                  className="bp3-minimal"
                  icon="shopping-cart"
                  text="My Orders"
                />
              </Link>
              <Link
                to={`/user`}
                style={{ textDecoration: 'none', color: '#f5f8fa' }}
              >
                <Button
                  className="bp3-minimal"
                  icon="power"
                  text="Logout"
                  onClick={handleLogout}
                />
              </Link>{' '}
            </>
          ) : (
            <Link
              to={`/user`}
              style={{ textDecoration: 'none', color: '#f5f8fa' }}
            >
              <Button className="bp3-minimal" icon="power" text="Home" />
            </Link>
          )}
        </Navbar.Group>
      </Navbar>
    </div>
  );
}
