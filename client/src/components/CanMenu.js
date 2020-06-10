import React, { useEffect, useState } from 'react';
import {
  Button,
  InputGroup,
  Card,
  HTMLSelect,
  Elevation,
} from '@blueprintjs/core';
import axios from 'axios';
import NavBarCan from './NavBarCan';
import useForm from './useForm';
import validate from './menuValidate';

import '../styles/canMenu.css';

export default function CanDashBoard() {
  const { values, errors, handleChange, handleSubmit } = useForm(sub, validate);
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [i, seti] = useState([]);
  const [price, setPrice] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    fetchData();
    fetchItems();
  }, [show]);
  const fetchData = () => {
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios.get(`http://localhost:5000/menu/`, config).then((res) => {
      const menu_data = res.data.menu;
      console.log(menu_data);
      //res.data.menu[3].map(m => console.log(m));
      setMenu(menu_data);
    });
  };
  const fetchItems = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    console.log(config);
    axios.get(`http://localhost:5000/item/`, config).then((res) => {
      const items = res.data.item;
      console.log(items);
      //res.data.menu[3].map(m => console.log(m));
      setItems(items);
    });
  };
  function sub(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios
      .get(`http://localhost:5000/menu/update/${i}/${price}`, config)
      .then((res) => {
        console.log(res);
        setShow([...show, 1]);
      });
  }
  const handleDelete = (i) => {
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios
      .get(`http://localhost:5000/menu/delete/${i.item_id}`, config)
      .then((res) => {
        console.log(res);
        setShow([...show, 1]);
      });
  };
  //const handleEdit
  return (
    <div>
      <NavBarCan />
      <div className="containerMenu">
        <div
          style={{
            marginTop: '10vh',
          }}
          className="menu"
        >
          {menu.map((m) => (
            <div
              style={{
                margin: '10px auto 10px auto',
                width: '50%',
                textAlign: 'left',
              }}
              key={m.item_id}
            >
              <Card elevation={Elevation.TWO}>
                <h3 style={{ color: '#2377aa' }}>{m.item_name}</h3>
                <p>
                  <b>Description :</b> {m.description}
                </p>
                <p>
                  <b>Price :</b> {m.price}
                </p>
                <p>
                  <b>Type :</b> {m.item_type}
                </p>
                <Button
                  icon="trash"
                  onClick={() => handleDelete(m)}
                  className="bp3-intent-primary"
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))}
        </div>
        <form onSubmit={sub} className="menuForm">
          <label className="label">Select Item </label>
          <HTMLSelect name="item_select" onChange={(e) => seti(e.target.value)}>
            <option>Select Item</option>
            {items.map((i) => (
              <option value={i.item_id}>
                {i.item_name} {i.item_type}
              </option>
            ))}
          </HTMLSelect>

          <InputGroup
            className="inputField"
            leftIcon="dollar"
            placeholder="Enter price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <Button
            className="submitBtn bp3-intent-success"
            type="submit"
            value="Login"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
