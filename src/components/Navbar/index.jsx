import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import user from "../../imgs/profile.png";
import { Link } from "react-router-dom";
import '../Navbar/navbar.css'

function Navbar() {
    const menu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to="/profile">
                  Profile
                </Link>
            </Menu.Item>
        </Menu>
    );
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