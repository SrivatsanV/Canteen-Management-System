import React, { useEffect, useState } from "react";
import { Button, InputGroup, Card, Navbar } from "@blueprintjs/core";
import axios from "axios";
import ItemCard from "./ItemCard";
import PlaceOrder from "./PlaceOrder";
import NavBarUser from "./NavBarUser";

export default function Menu({ match }) {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);

  const cid = match.params.id;
  useEffect(() => {
    fetchData();
  }, [items]);
  const fetchData = () => {
    const token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    axios.get(`http://localhost:5000/menu/${cid}`, config).then(res => {
      const menu_data = res.data.menu;
      console.log(menu_data);
      //res.data.menu[3].map(m => console.log(m));
      setMenu(menu_data);
    });
  };

  const handleOrders = i => {
    setItems([...items, i]);
  };
  const handleDelete = e => {
    var buffer = [...items];
    var res = [];
    var j = 0;
    for (var i in buffer) {
      if (buffer[i].item_id == e.item_id && j == 0) {
        j++;
        continue;
      }
      res.push(buffer[i]);
    }
    setItems(res);
  };
  const handleClear = () => {
    setItems([]);
  };
  return (
    <div>
      <NavBarUser />
      <div style={{ marginTop: "10vh" }}>
        {menu.map(m => (
          <div
            style={{
              margin: "10px auto 10px auto",
              width: "50%",
              textAlign: "left"
            }}
            key={m.item_id}
          >
            <Card>
              <h3>{m.item_name}</h3>
              <p>{m.description}</p>
              <p>Price : {m.price}</p>
              <p>Type : {m.item_type}</p>
              <Button onClick={() => handleOrders(m)}>add</Button>
            </Card>
          </div>
        ))}
        <PlaceOrder
          items={items}
          handleDelete={handleDelete}
          handleClear={handleClear}
        />
      </div>
    </div>
  );
}
