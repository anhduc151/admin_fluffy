import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from "react";

function Payment() {
    const [selected, setSelected] = useState(4);

    useEffect(() => {
      setSelected(4);
    }, []);
    return ( 
        <div className="AppGlass">
        <Sidebar />
        <div className='dashboard_content'>
          <h1>Payment</h1>
          <MainDash />
        </div>
        <Navbar />
      </div>
     );
}

export default Payment;