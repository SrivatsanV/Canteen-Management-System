import React, { useEffect, useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import axios from "axios";
import CanteenCard from "./CanteenCard";
import NavBarUser from "./NavBarUser";

export default function CanteenList() {
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
    <div >
      {/* {Object.keys(menu).map((key, index) =>
        menu[key].map(m => <p>{m.item_id}</p>)
      )} */}
      <NavBarUser />
      <div style={{ marginTop: "10vh",fontFamily:"Lucida Sans Unicode",color:"#230444"}}>
      <img src="/person.ico"/>
        {canteen.map(c => (
          <CanteenCard c={c} />
        ))}
      </div>
    </div>
  );
}
