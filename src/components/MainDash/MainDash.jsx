import React from "react";
import Cards from "../Cards/Cards";
import welcomett from "../../imgs/welcome-removebg-preview.png"
import "./MainDash.css";
import { useSelector } from "react-redux";
const MainDash = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="MainDash">
      {/* <h1>Dashboard</h1> */}
      <Cards />
      <div className="table-data">
              <div className="dashboard__welcome">
                <div className="dashboard__tieude">
                  <h1 className="dashboard__welh1">
                    Welcome administrator, {user.firstName} {user.lastName} !!
                  </h1>
                </div>
                <img src={welcomett} className="dashboard__img"></img>
              </div>
            </div>
    </div>
  );
};

export default MainDash;
