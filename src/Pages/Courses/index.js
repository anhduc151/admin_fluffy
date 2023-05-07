import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
// import RightSide from '../../components/RigtSide/RightSide';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from "react";
import '../Courses/courses.css'

function Courses() {
  const [selected, setSelected] = useState(2);

  useEffect(() => {
    setSelected(2);
  }, []);
  return (
    <div className="AppGlass">
      <Navbar />
      <div className='App_container'>
        <Sidebar />
        <div className='App_content'>
          <h1>Courses</h1>
          <MainDash />
        </div>
      </div>
    </div>
  );
}

export default Courses;