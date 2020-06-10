import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import CanteenList from './components/CanteenList';
import Menu from './components/Menu';
import OrdersUser from './components/OrdersUser';
import LoginCanteen from './components/LoginCanteen';
import CanteenReg from './components/RegisterCanteen';
import CanteenDash from './components/CanDashBoard';
import CanMenu from './components/CanMenu';

import AdminForm from './components/AdminForm';
import AdminDash from './components/AdminDash';
import PageNotFound from './components/PageNotFound';

import AccessDenied from './components/AccessDenied';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AssignPermission from './components/AssignPermission';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/user" />
          <Route path="/user" exact component={Login} />
          <Route
            path="/canteenlist"
            exact
            render={() => (
              <PrivateRoute component={CanteenList} action="user_canteenlist" />
            )}
          />
          <Route path="/menu/:id" component={Menu} />
          <Route
            path="/user/orders"
            exact
            render={() => (
              <PrivateRoute component={OrdersUser} action="user_user_orders" />
            )}
          />
          <Route path="/register/user" exact component={RegisterUser} />
          <Route path="/canteen" exact component={LoginCanteen} />
          <Route path="/register/canteen" exact component={CanteenReg} />
          <Route
            path="/canteen/orders"
            exact
            render={() => (
              <PrivateRoute
                component={CanteenDash}
                action="canteen_canteen_dash"
              />
            )}
          />
          <Route
            path="/canteen/menu"
            exact
            render={() => (
              <PrivateRoute component={CanMenu} action="canteen_canteen_menu" />
            )}
          />
          <Route path="/user/admin" exact component={AdminForm} />
          <Route
            path="/admindash"
            exact
            render={() => (
              <PrivateRoute component={AdminDash} action="admin_admindash" />
            )}
          />
          <Route
            path="/assign_perms"
            exact
            render={() => (
              <PrivateRoute component={AssignPermission} action="assign_perm" />
            )}
          />
          <Route path="/access_denied" exact component={AccessDenied} />
          <Route path="*" exact={true} component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
