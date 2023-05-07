import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from "react";

function Student() {
    const [selected, setSelected] = useState(3);

    useEffect(() => {
      setSelected(3);
    }, []);
    return ( 
        <div className="AppGlass">
      <Sidebar />
      <div className='dashboard_content'>
        <h1>Student</h1>
        <MainDash />
      </div>
      <Navbar />
    </div>
     );
}

export default Student;