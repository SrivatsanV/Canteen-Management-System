import React, { useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import "../styles/login.css";
import validate from "./loginValidation";
import useForm from "./useForm";

export default function Login() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [show, setShow] = useState(false);
  const [err, setErr] = useState([]);
  function login() {
    console.log(values);
    axios.post(`http://localhost:5000/canteen/login`, values).then(res => {
      console.log(res);
      console.log(res.data);
      if (res.data.msg) {
        setErr({ msg: res.data.msg });
      } else {
        localStorage.setItem("token", res.data.token);
        setShow(true);
      }
    });
  }
  if (!show) {
    return (
      <div className="login">
      <img src="/food2.PNG"   style={{ margin: "0 0 auto auto"}} />
        <h2>
          <i class="fas fa-utensils"></i>
          {"    "}NITK NC
        </h2>
        <form style={{ textAlign: "left"  }} onSubmit={handleSubmit}>
          {err.msg && <p className="danger">{err.msg}</p>}
          <label className="label">Email Address</label>
          <InputGroup
            className="inputField"
            leftIcon="envelope"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          {errors.email && <p className="danger">{errors.email}</p>}
          <label className="label">Password</label>
          <InputGroup
            className="inputField"
            leftIcon="lock"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
          {errors.password && <p className="danger">{errors.password}</p>}
          <Button
            className="submitBtn bp3-intent-success"
            type="submit"
            value="Login"
          >
            Login
          </Button>
        </form>
        <Link to="/register/canteen">
          <Button
            className="submitBtn bp3-intent-success"
            style={{ marginTop: "10px" }}
          >
            Register
          </Button>
        </Link>
          <img src="/food1.PNG" />
      </div>
    );
  } else {
    return <Redirect to="/canteen/orders" />;
  }
}
