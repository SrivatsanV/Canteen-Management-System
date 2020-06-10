import React, { useEffect, useState } from 'react';
import NavBarUser from './NavBarUser';
import axios from 'axios';
import { Button, InputGroup, Card, Elevation } from '@blueprintjs/core';

export default function OrdersUser() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    console.log(token);
    axios.get(`http://localhost:5000/order/user/orders`, config).then((res) => {
      console.log(res.data.orders);
      setOrders(res.data.orders);
    });
  };
  if (Object.keys(orders).length !== 0) {
    return (
      <div>
        <NavBarUser view={true} />
        <div style={{ marginTop: '10vh' }}>
          {Object.keys(orders).map((key, index) => (
            <Card
              style={{
                width: '50%',
                margin: ' 20px auto auto auto',
              }}
              elevation={Elevation.TWO}
            >
              <h3>Order ID : {key}</h3>
              {orders[key][0].order_status == 'Order Accepted' &&
              orders[key][0].order_status != 'Order Rejected' ? (
                <h4 style={{ color: '#119a61' }}>
                  Order Status : {orders[key][0].order_status}
                </h4>
              ) : null}
              {orders[key][0].order_status == 'Order Rejected' &&
              orders[key][0].order_status != 'Order Accepted' ? (
                <h4 style={{ color: '#dc3c3c' }}>
                  Order Status : {orders[key][0].order_status}
                </h4>
              ) : null}
              {orders[key][0].order_status != 'Order Rejected' &&
              orders[key][0].order_status != 'Order Accepted' ? (
                <h4>Order Status : {orders[key][0].order_status}</h4>
              ) : null}
              {orders[key].map((o) => (
                <p>
                  {o.item_name} : {o.price}
                </p>
              ))}
              <h4>Total Price : {orders[key][0].total_price}</h4>
              <h5>
                Canteen : {orders[key][0].canteen_name} Ph :
                {orders[key][0].phone_num}
              </h5>
            </Card>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBarUser view={true} />
        <h1 style={{ marginTop: '15vh' }}>No Orders</h1>
      </div>
    );
  }
}
