import React from "react";
import "./App.css";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import CanteenList from "./components/CanteenList";
import Menu from "./components/Menu";
import OrdersUser from "./components/OrdersUser";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/user" exact component={Login} />
          <Route path="/canteenlist" exact component={CanteenList} />
          <Route path="/menu/:id" component={Menu} />
          <Route path="/user/orders" exact component={OrdersUser} />
          <Route path="/register/user" exact component={RegisterUser} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
