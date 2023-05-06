import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import user from "../../imgs/profile.png";
import { useNavigate } from "react-router-dom";
import '../Navbar/navbar.css'

function Navbar() {
    const menu = (
        <Menu>
            <Menu.Item key="profile">
                Profile
            </Menu.Item>
            <Menu.Item key="logout" onClick={() => handleLogout()}>
                Logout
            </Menu.Item>
        </Menu>
    );
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/");
        window.location.reload(false);
    };
    return (
        <nav className="nav_header">
            <div className="nav_container">
                <div className="nav_avatar">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar className="avatar" src={user} size={50} />
                    </Dropdown>
                </div>
                <div className="nav_name">
                    <h2 className="nav_h2">John</h2>
                    <p className="nav_mail">John.nth@gmail.com</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;