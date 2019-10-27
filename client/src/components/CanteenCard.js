import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Link } from "react-router-dom";

export default function CanteenCard(props) {
  const canteen = props.c;
  return (
    <div
      style={{ margin: "10px auto 10px auto", width: "50%" }}
      key={canteen.canteen_id}
    >
      <Card interactive={true} elevation={Elevation.THREE}>
        <h3>{canteen.canteen_name}</h3>
        <p>Phone number : {canteen.phone_num}</p>
        <p>Location : {canteen.location}</p>
        <p>Type : {canteen.type}</p>
        <Link to={`/menu/${canteen.canteen_id}`}>
          <Button>View Items</Button>
        </Link>
      </Card>
    </div>
  );
}
