import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
import Navbar from '../../components/Navbar';
import React from "react";
import '../Courses/courses.css'

function Courses() {
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