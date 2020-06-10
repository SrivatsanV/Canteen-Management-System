import React from 'react';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
  return (
    <div>
      <h1>Access Denied</h1>
      <Link to={`/user`} style={{ textDecoration: 'none', color: '#f5f8fa' }}>
        <Button className="bp3-minimal" text="Go Back" />
      </Link>
    </div>
  );
}
