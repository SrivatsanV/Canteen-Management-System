import React, { useState } from "react";
import { Button, InputGroup, RadioGroup, Radio } from "@blueprintjs/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "../styles/login.css";
import validate from "./loginValidation";
import useForm from "./useForm";

export default function RegisterUser() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    validate
  );
  const [emailErr, setemailErr] = useState({});
  const [show, setShow] = useState(false);
  function register() {
    console.log(values);
    axios.post(`http://localhost:5000/user/admin/login`, values).then(res => {
      console.log(res);
      console.log(res.data);

      if (res.data.msg != "Logged in") {
        setemailErr({ msg: res.data.msg });
      } else {
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
          <label className="label">Email Address</label>
          <InputGroup
            className="inputField"
            leftIcon="envelope"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          {<p className="danger">{emailErr.msg}</p>}
          {errors.email && <p className="danger">{errors.email}</p>}

          <label className="label">Password</label>
          <InputGroup
            className="inputField"
            leftIcon="lock"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="help is-danger">{errors.password}</p>
          )}

          <Button
            className="submitBtn bp3-intent-success"
            type="submit"
            value="Login"
          >
            Login
          </Button>
        </form>
       <img src="/food1.PNG" />
      </div>
    );
  } else {
    return <Redirect to="/admindash" />;
  }
}
