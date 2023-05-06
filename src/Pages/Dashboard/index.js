import '../Dashboard/dashboard.css'
import Sidebar from '../../components/SideBar/Sidebar';
import MainDash from '../../components/MainDash/MainDash';
import RightSide from '../../components/RigtSide/RightSide';
import Navbar from '../../components/Navbar';


function DashBoard() {
  return (
    
      <div className="AppGlass">
        <Sidebar />
        <Navbar/>
        <h1>Dashboard</h1>
        
      </div>
    
  );
}

export default DashBoard;