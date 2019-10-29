import React, { useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "../styles/login.css";
import validate from "./registerValidation";
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
    axios.post(`http://localhost:5000/user/register`, values).then(res => {
      console.log(res);
      console.log(res.data);
      if (res.data.msg == "email already registered") {
        setemailErr({ msg: "Email already registered" });
      } else {
        setShow(true);
      }
    });
  }
  if (!show) {
    return (
      <div className="login" onSubmit={handleSubmit}>
        <h2>
          <i class="fas fa-utensils"></i>
          {"    "}NITK NC
        </h2>
        <form style={{ textAlign: "left" }}>
          <label className="label">Email Address</label>
          <InputGroup
            className="inputField"
            leftIcon="envelope"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          {emailErr.msg && <p className="danger">{emailErr.msg}</p>}
          {errors.email && <p className="danger">{errors.email}</p>}
          <label className="label">Name</label>
          <InputGroup
            className="inputField"
            leftIcon="user"
            placeholder="Enter Your Name"
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="danger">{errors.name}</p>}
          <label className="label">Phone Number</label>
          <InputGroup
            className="inputField"
            leftIcon="phone"
            placeholder="Enter Phone Number"
            name="phone_num"
            onChange={handleChange}
          />
          {errors.phone_num && <p className="danger">{errors.phone_num}</p>}
          <label className="label">Address</label>
          <InputGroup
            className="inputField"
            leftIcon="locate"
            placeholder="Enter Address"
            name="address"
            onChange={handleChange}
          />
          {errors.address && <p className="danger">{errors.address}</p>}
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
            value="Register"
          >
            Register
          </Button>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/user" />;
  }
}
