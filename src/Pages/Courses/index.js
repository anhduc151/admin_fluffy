import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
// import RightSide from '../../components/RigtSide/RightSide';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from "react";

function Courses() {
    const [selected, setSelected] = useState(2);

    useEffect(() => {
      setSelected(2);
    }, []);
    return ( 
        <div className="AppGlass">
      <Sidebar />
      <div className='dashboard_content'>
        <h1>Courses</h1>
        <MainDash />
      </div>
      <Navbar />
    </div>
     );
}

export default Courses;