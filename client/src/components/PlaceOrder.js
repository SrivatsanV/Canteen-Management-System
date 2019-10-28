import React, { useEffect, useState } from "react";
import { Button, Alert, Card } from "@blueprintjs/core";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PlaceOrder(props) {
  var items = props.items;
  const [ordered, setordered] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  console.log(items);
  var item_ids = [],
    sum = 0;
  useEffect(() => {
    setordered(items);
    settotal(sum);
    console.log(ordered);
  }, [items]);

  const [total, settotal] = useState(0);
  props.items.map(i => {
    sum += parseInt(i.price);
  });
  const handleClick = e => {
    setordered([...items.filter(order => order.item_id != e.item_id)]);
    sum -= parseInt(e.price);
    settotal(sum);
    props.handleDelete(e);
    console.log(ordered);
  };

  const submit = () => {
    ordered.map(o => item_ids.push(o.item_id));
    const token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    var values = {
      canteen_id: ordered[0].canteen_id,
      order_status: "Order Placed",
      items: item_ids
    };
    axios.post("http://localhost:5000/order", values, config).then(res => {
      console.log(res.data);
    });
    props.handleClear();
    settotal(0);
    toggleOverlay();
  };

  const toggleOverlay = () => {
    setisOpen(!isOpen);
  };
  if (ordered.length != 0) {
    return (
      <div>
        {ordered.map(m => (
          <div
            style={{
              textAlign: "left"
            }}
            key={m.item_id}
          >
            <Card>
              <h3>
                {m.item_name} | Price : {m.price}
              </h3>
              <Button
                icon="trash"
                className="bp3-intent-danger"
                onClick={() => handleClick(m)}
              />
            </Card>
          </div>
        ))}
        <Card>
          <h3>Total Price : {total}</h3>
          <Button onClick={toggleOverlay}></Button>
        </Card>
        <Alert
          isOpen={isOpen}
          onConfirm={submit}
          onCancel={toggleOverlay}
          cancelButtonText={"Cancel"}
          confirmButtonText={"Confirm"}
          transitionDuration={3000}
        >
          Confirm Your Order
        </Alert>
      </div>
    );
  } else {
    return (
      <Card>
        <h3>Total Price : {total}</h3>
      </Card>
    );
  }
}
