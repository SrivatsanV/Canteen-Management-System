import React, { useState, useEffect } from 'react';
import { Button, Navbar, Alignment, HTMLSelect } from '@blueprintjs/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AssignPermission() {
  const roles = ['user', 'visitor', 'canteen'];
  const permissions = [
    'user_canteenlist',
    'user_menu',
    'user_user_orders',
    'canteen_canteen_menu',
    'canteen_canteen_dash',
  ];
  const operations = {
    user_menu: ['view_only', 'add_items', 'place_order'],
    user_canteenlist: ['view_only'],
  };
  const [items, setItems] = useState({ perm: [], ops: [] });
  useEffect(() => {
    axios.get(`http://localhost:5000/role/operations/`).then((res) => {
      console.log(res.data);
      setItems({ perm: res.data.perm, ops: res.data.ops });
    });
  }, []);
  const [role, setRole] = useState('');
  const [perm, setPerm] = useState({ perm: '', show: false });
  const [ops, setOps] = useState('');
  const handlePerm = (val) => {
    setPerm({ perm: val, show: val in operations });
  };
  const sub = () => {
    var values = {
      role,
      perm: perm.perm,
      ops,
    };
    axios.post('http://localhost:5000/role/assign/', values).then((res) => {
      console.log(res);
    });
  };
  const del = () => {
    var values = {
      role,
      perm: perm.perm,
      ops,
    };
    axios.post('http://localhost:5000/role/delete/', values).then((res) => {
      console.log(res);
    });
  };
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
          <Link
            to={`/admindash`}
            style={{ textDecoration: 'none', color: '#f5f8fa' }}
          >
            <Button className="bp3-minimal" text="Admin Dash" />
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
          </Link>
        </Navbar.Group>
      </Navbar>
      <div style={{ marginTop: '10vh' }}>
        <h1>Roles with permissions</h1>
        <table
          style={{
            margin: 'auto',
            textAlign: 'left',
            border: '1px solid black',
          }}
        >
          <tr>
            <th style={{ borderRight: '1px solid black' }}>Role</th>
            <th>Permission</th>
          </tr>

          {items['perm'].map((i) => (
            <tr>
              <td style={{ borderRight: '1px solid black' }}>{i.roles} </td>
              <td>{i.permission}</td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <h1>Roles with permission and operations</h1>
        <table
          style={{
            margin: 'auto',
            textAlign: 'left',
            border: '1px solid black',
          }}
        >
          <tr>
            <th style={{ borderRight: '1px solid black' }}>Role</th>
            <th style={{ borderRight: '1px solid black' }}>Permission</th>
            <th>Operation</th>
          </tr>

          {items['ops'].map((i) => (
            <tr>
              <td style={{ borderRight: '1px solid black' }}>{i.roles} </td>
              <td style={{ borderRight: '1px solid black' }}>{i.permission}</td>
              <td>{i.operation}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ display: 'flex' }}>
        <form
          onSubmit={sub}
          style={{ margin: '10vh auto auto auto', width: '30%' }}
        >
          <HTMLSelect
            name="item_select"
            onChange={(e) => setRole(e.target.value)}
          >
            <option> Select Role</option>
            {roles.map((role) => (
              <option value={role}>{role}</option>
            ))}
          </HTMLSelect>
          <HTMLSelect
            name="item_select"
            onChange={(e) => handlePerm(e.target.value)}
          >
            <option> Select Permission</option>
            {permissions.map((p) => (
              <option value={p}>{p}</option>
            ))}
          </HTMLSelect>
          {perm.show ? (
            <HTMLSelect
              name="item_select"
              onChange={(e) => setOps(e.target.value)}
            >
              <option> Select Role</option>
              {operations[perm.perm].map((op) => (
                <option value={op}>{op}</option>
              ))}
            </HTMLSelect>
          ) : (
            <></>
          )}
          <Button
            className="submitBtn bp3-intent-success"
            type="submit"
            value="Login"
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
        <form
          onSubmit={del}
          style={{ margin: '10vh auto auto auto', width: '30%' }}
        >
          <HTMLSelect
            name="item_select"
            onChange={(e) => setRole(e.target.value)}
          >
            <option> Select Role</option>
            {roles.map((role) => (
              <option value={role}>{role}</option>
            ))}
          </HTMLSelect>
          <HTMLSelect
            name="item_select"
            onChange={(e) => handlePerm(e.target.value)}
          >
            <option> Select Permission</option>
            {permissions.map((p) => (
              <option value={p}>{p}</option>
            ))}
          </HTMLSelect>
          {perm.show ? (
            <HTMLSelect
              name="item_select"
              onChange={(e) => setOps(e.target.value)}
            >
              <option> Select Role</option>
              {operations[perm.perm].map((op) => (
                <option value={op}>{op}</option>
              ))}
            </HTMLSelect>
          ) : (
            <></>
          )}
          <Button
            className="submitBtn bp3-intent-danger"
            type="submit"
            value="Login"
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
