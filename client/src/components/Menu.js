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
      <div
        style={{
          marginTop: "10vh",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridGap: "50px"
        }}
      >
        <div style={{ gridColumn: "1/2", overflowY: "scroll", height: "90vh" }}>
          {menu.map(m => (
            <div
              style={{
                margin: "10px auto 10px auto",
                width: "50%",
                textAlign: "left"
              }}
              key={m.item_id}
            >
              <Card
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  alignItems: "center"
                }}
              >
                <div style={{ gridColumn: "1/2" }}>
                  <h3 style={{ color: "#2377aa" }}>{m.item_name}</h3>
                  <p>
                    <b>Description : </b>
                    {m.description}
                  </p>
                  <p>
                    <b>Price :</b> {m.price}
                  </p>
                  <p>
                    <b>Type :</b> {m.item_type}
                  </p>
                </div>
                <div style={{ gridColumn: "2/3" }}>
                  <Button
                    onClick={() => handleOrders(m)}
                    // className="bp3-intent-success"
                    className="submitBtn bp3-intent-danger"
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <PlaceOrder
          items={items}
          handleDelete={handleDelete}
          handleClear={handleClear}
          style={{
            gridColumn: "2/3",
            textAlign: "center",
            overflowY: "scroll",
            height: "90vh"
          }}
        />
      </div>
    </div>
  );
}
