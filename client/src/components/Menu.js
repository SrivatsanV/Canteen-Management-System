import React, { useEffect, useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import ItemCard from "./ItemCard";

export default function Menu({ match }) {
  const [menu, setMenu] = useState([]);

  const cid = match.params.id;
  useEffect(() => {
    fetchData();
  }, []);
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
  return (
    <div>
      {menu.map(m => (
        <ItemCard m={m} key={m.item_id} />
      ))}
    </div>
  );
}
