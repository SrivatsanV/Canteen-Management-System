import React from "react";
import "./App.css";
import Login from "./components/Login";
import ItemsList from "./components/ItemsList";
import Menu from "./components/Menu";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/user" exact component={Login} />
          <Route path="/itemlist" exact component={ItemsList} />
          <Route path="/menu/:id" component={Menu} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
