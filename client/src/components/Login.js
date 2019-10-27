import React, { useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

import "../styles/login.css";
import validate from "./loginValidation";
import useForm from "./useForm";
import ItemsList from "./ItemsList";

export default function Login() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [show, setShow] = useState(false);
  function login() {
    console.log(values);
    axios.post(`http://localhost:5000/user/login`, values).then(res => {
      console.log(res);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      setShow(true);
    });
  }

  return (
    <div className="login" onSubmit={handleSubmit}>
      <form style={{ textAlign: "left" }}>
        <label className="label">Email Address</label>
        <InputGroup
          className="inputField"
          leftIcon="envelope"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
        />
        {errors.email && <p className="help is-danger">{errors.email}</p>}
        <label className="label">Password</label>
        <InputGroup
          className="inputField"
          leftIcon="lock"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
        />
        {errors.password && <p className="help is-danger">{errors.password}</p>}
        <Link to="/itemlist">
          <Button
            className="submitBtn bp3-intent-success"
            type="submit"
            value="Login"
          >
            Login
          </Button>
        </Link>
      </form>
    </div>
  );
}
