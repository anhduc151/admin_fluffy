import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate()
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const handleLogOut = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/signin");
    // window.location.reload(false);
  }
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>Fluffy</span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <NavLink
                to={item.url}
                activeClassName="active"
                className="menuItem"
                key={index}
              >
                <item.icon />
                <span>{item.heading}</span>
              </NavLink>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={handleLogOut}>
            <UilSignOutAlt />
            Log out
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;