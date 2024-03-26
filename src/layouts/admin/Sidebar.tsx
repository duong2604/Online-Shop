/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/scss/layouts/admin/sidebar.scss";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { useLocation, useNavigate } from "react-router-dom";
import { navigationLinks } from "../../assets/data/data";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarText, setSidebarText] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const { isSidebarOpen } = useContext<any>(SidebarContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const order = navigationLinks.find(
      (item) => item.link === pathname.split("/")[2]
    );
    setActiveLinkIdx(order?.id || 1);
  }, [pathname]);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
      setSidebarText("setSidebarText");
      setBorderRadius("borderRadius");
    } else {
      setSidebarClass("");
      setSidebarText("");
      setBorderRadius("");
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <img
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          src={logo}
          alt="Ảnh logo"
        />
      </div>

      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-list-item">Hello</li>
          <li className="nav-list-item">Hello</li>
          <li className="nav-list-item">Hello</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
