import React, { useEffect, useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import CanteenCard from "./CanteenCard";

export default function ItemsList() {
  const [canteen, setCanteen] = useState([]);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    axios.get("http://localhost:5000/canteen", config).then(res => {
      const can_data = res.data.nc;
      console.log(res.data.nc);
      setCanteen(can_data);
    });
    axios.get(`http://localhost:5000/menu`, config).then(res => {
      const menu_data = res.data.menu;
      console.log(menu_data);
      //res.data.menu[3].map(m => console.log(m));
      setMenu(menu_data);
    });
  };

  return (
    <div>
      {/* {Object.keys(menu).map((key, index) =>
        menu[key].map(m => <p>{m.item_id}</p>)
      )} */}
      {canteen.map(c => (
        <CanteenCard c={c} />
      ))}
    </div>
  );
}
