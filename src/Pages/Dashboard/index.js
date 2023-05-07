import '../Dashboard/dashboard.css'
import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
// import RightSide from '../../components/RigtSide/RightSide';
import Navbar from '../../components/Navbar';


function DashBoard() {
  return (

    <div className="AppGlass">
      <Navbar />
      <div className='App_container'>
        <Sidebar />
        <div className='App_content'>
          <h1>Dashboard</h1>
          <MainDash />
        </div>
      </div>
    </div>

  );
}

export default DashBoard;