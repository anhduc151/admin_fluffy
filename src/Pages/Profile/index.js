import '../Profile/profile.css'
import Sidebar from '../../components/SideBar/Sidebar';
import Navbar from '../../components/Navbar';

function Profile() {
    return (
        <>
            <div className="AppGlass">
                <div className='App_container'>
                    <Sidebar />
                    <div className='App_content'>
                        <h1>Profile</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;