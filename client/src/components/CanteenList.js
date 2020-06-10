import React, { useEffect, useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import axios from 'axios';
import CanteenCard from './CanteenCard';
import NavBarUser from './NavBarUser';

import Access from '../Authorization/Access';

export default function CanteenList() {
  const [canteen, setCanteen] = useState([]);
  const [menu, setMenu] = useState([]);
  const [show, setShow] = useState(false);
  const [rules, setRules] = useState({ page: false, op: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };

    axios.get(`http://localhost:5000/role/`, config).then((res) => {
      axios
        .get(`http://localhost:5000/role/permissions/`, {
          params: { role: res.data.role },
        })
        .then((res) => {
          console.log(res.data);
          const rul = Access('user_canteenlist', true, res.data);
          console.log(rul);
          setRules(rul);
          if (rul) {
            setShow(true);
          }
        });
    });
    fetchData();
  }, []);
  const fetchData = () => {
    const token = localStorage.getItem('token');
    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    axios.get('http://localhost:5000/canteen', config).then((res) => {
      const can_data = res.data.nc;
      console.log(res.data.nc);
      setCanteen(can_data);
    });
    axios.get(`http://localhost:5000/menu`, config).then((res) => {
      const menu_data = res.data.menu;
      console.log(menu_data);
      //res.data.menu[3].map(m => console.log(m));
      setMenu(menu_data);
    });
  };
  if (show) {
    return (
      <div>
        {/* {Object.keys(menu).map((key, index) =>
        menu[key].map(m => <p>{m.item_id}</p>)
      )} */}
        {rules.op['user_canteenlist'].includes('view_only') ? (
          <NavBarUser view={false} />
        ) : (
          <NavBarUser view={true} />
        )}

        <div style={{ marginTop: '10vh' }}>
          {canteen.map((c) => (
            <CanteenCard c={c} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
