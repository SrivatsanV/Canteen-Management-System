import React, { useEffect, useState } from "react";
import NavBarUser from "./NavBarUser";
import axios from "axios";
import { Button, InputGroup, Card, Navbar } from "@blueprintjs/core";

export default function OrdersUser() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    axios.get(`http://localhost:5000/order/user/orders`, config).then(res => {
      console.log(res.data.orders);
      setOrders(res.data.orders);
    });
  };
  return (
    <div>
      <NavBarUser />
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
          </Card>
        ))}
      </div>
    </div>
  );
}
