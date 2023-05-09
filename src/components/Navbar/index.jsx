import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import avt from "../../imgs/profile.png";
import { Link } from "react-router-dom";
import '../Navbar/navbar.css'
import { useSelector } from "react-redux";

function Navbar() {
    const user = useSelector(state=>state.user.currentUser)
    return (
        <nav className="nav_header">
            <div className="nav_container">
                <div className="nav_avatar">
                        <Avatar className="avatar" src={avt} size={50} />
                </div>
                <div className="nav_name">
                    <h2 className="nav_h2">{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="nav_mail">{user.email}</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;