import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function ItemCard(props) {
  const item = props.m;
  const handleChange = (e) => {
    props.handleOrders(e);
  };
  return (
    <div
      style={{ margin: '10px auto 10px auto', width: '50%', textAlign: 'left' }}
      key={item.canteen_id}
    >
      <Card>
        <h3>{item.item_name}</h3>
        <p>{item.description}</p>
        <p>Price : {item.price}</p>
        <p>Type : {item.item_type}</p>
        <Button onClick={handleChange(item.item_id)}>add</Button>
      </Card>
    </div>
  );
}
