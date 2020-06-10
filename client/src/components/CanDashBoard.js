import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import axios from 'axios';
import NavBarCan from './NavBarCan';

export default function CanDashBoard() {
  const [orders, setOrders] = useState([]);
  const [no, setNo] = useState(false);
  const [show, setShow] = useState([]);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [show]);
  const fetchData = () => {
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios
      .get(`http://localhost:5000/order/canteen/orders`, config)
      .then((res) => {
        setOrders(res.data.orders);
        if (Object.keys(res.data.orders).length !== 0) setNo(true);
      });
  };
  const handleClick = (o) => {
    console.log(o);
    var buffer = orders;
    var c = 0;
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios
      .get(`http://localhost:5000/order/canteen/orders/accept/${o}`, config)
      .then((res) => {
        console.log(res.data.orders);
        setShow([...show, 1]);
      });
  };

  const handleReject = (o) => {
    console.log(o);
    var buffer = orders;
    var c = 0;
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios
      .get(`http://localhost:5000/order/canteen/orders/reject/${o}`, config)
      .then((res) => {
        console.log(res.data.orders);
        setShow([...show, 1]);
      });
  };
  if (no) {
    return (
      <div>
        <NavBarCan />
        <div style={{ marginTop: '10vh' }}>
          {Object.keys(orders).map((key, index) => (
            <Card
              style={{
                margin: '20px auto auto auto',
                width: '50%',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                alignItems: 'center',
              }}
              elevation={Elevation.TWO}
            >
              <div style={{ gridColumn: '1/2', textAlign: 'left' }}>
                <h3 style={{ color: '#2377aa' }}>Order ID : {key}</h3>
                {orders[key][0].order_status === 'Order Accepted' &&
                orders[key][0].order_status !== 'Order Rejected' ? (
                  <h4 style={{ color: '#119a61' }}>
                    Order Status : {orders[key][0].order_status}
                  </h4>
                ) : null}
                {orders[key][0].order_status === 'Order Rejected' &&
                orders[key][0].order_status !== 'Order Accepted' ? (
                  <h4 style={{ color: '#dc3c3c' }}>
                    Order Status : {orders[key][0].order_status}
                  </h4>
                ) : null}
                {orders[key][0].order_status !== 'Order Rejected' &&
                orders[key][0].order_status !== 'Order Accepted' ? (
                  <h4>Order Status : {orders[key][0].order_status}</h4>
                ) : null}
                {orders[key].map((o) => (
                  <p>
                    {o.item_name} : {o.price}
                  </p>
                ))}
                <h4>Total Price : {orders[key][0].total_price}</h4>
                <h5>
                  Customer : {orders[key][0].name} Ph :
                  {orders[key][0].phone_num}
                </h5>
              </div>
              <div style={{ gridColumn: '2/3' }}>
                {orders[key][0].order_status !== 'Order Accepted' &&
                orders[key][0].order_status !== 'Order Rejected' ? (
                  <Button
                    onClick={() => handleClick(key)}
                    className="bp3-intent-success"
                  >
                    Accept
                  </Button>
                ) : (
                  <Button className="bp3-intent-disabled">
                    {orders[key][0].order_status}
                  </Button>
                )}
                {orders[key][0].order_status !== 'Order Accepted' &&
                orders[key][0].order_status !== 'Order Rejected' ? (
                  <Button
                    onClick={() => handleReject(key)}
                    style={{ marginLeft: '20px' }}
                    className="bp3-intent-danger"
                  >
                    Reject
                  </Button>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBarCan />
        <h1 style={{ marginTop: '15vh' }}>No Orders yet</h1>
      </div>
    );
  }
}
