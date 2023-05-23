import '../Messages/messages.css'
import Chatbox from "../../components/Chatbox";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar/Sidebar";

function Messages() {
    return ( 
        <div className="AppGlass">
            <Navbar />
            <div className='App_container'>
                <Sidebar />
                <div className='App_content1'>
                    <h1>Messages</h1>
                    <Chatbox />
                </div>
            </div>
            
        </div>
     );
}

export default Messages;