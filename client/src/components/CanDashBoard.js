import React, { useEffect, useState } from "react";
import { Button, InputGroup, Card, Navbar } from "@blueprintjs/core";
import axios from "axios";
import NavBarCan from "./NavBarCan";

export default function CanDashBoard() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    fetchData();
  }, [show]);
  const fetchData = () => {
    const token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    axios
      .get(`http://localhost:5000/order/canteen/orders`, config)
      .then(res => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      });
  };
  const handleClick = o => {
    console.log(o);
    var buffer = orders;
    var c = 0;
    const token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    axios
      .get(`http://localhost:5000/order/canteen/orders/accept/${o}`, config)
      .then(res => {
        console.log(res.data.orders);
        setShow([...show, 1]);
      });
  };
  return (
    <div>
      <NavBarCan />
      <div style={{ marginTop: "10vh" }}>
        {Object.keys(orders).map((key, index) => (
          <Card style={{ width: "50%", margin: "auto" }}>
            <h3>Order ID : {key}</h3>
            <h4>Order Status : {orders[key][0].order_status}</h4>
            {orders[key].map(o => (
              <p>
                {o.item_name} : {o.price}
              </p>
            ))}
            <h4>Total Price : {orders[key][0].total_price}</h4>
            {orders[key][0].order_status != "Order Accepted" ? (
              <Button onClick={() => handleClick(key)}>Accept</Button>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
