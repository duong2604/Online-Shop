/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown } from "antd";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import ModalUser from "./modal";
import MenuIcon from "../../assets/svg/menuIcon";
import "../../assets/scss/layouts/admin/contentTop.scss";
import BellIcon from "../../assets/svg/bellIcon";
import userImg from "../../assets/images/user.png";

const ContentTop: React.FC = () => {
  const { toggleSidebar } = useContext<any>(SidebarContext);

  return (
    <div className="content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <MenuIcon />
        </button>
      </div>
      <div className="content-top-btn">
        <button className="notification-btn content-top-btn">
          <BellIcon />
          <span className="notification-btn-dot" />
        </button>
        <div className="notification-user">
          <Dropdown
            overlay={<ModalUser />}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <div>
              <img
                src={userImg}
                width="25px"
                height="25px"
                style={{ borderRadius: "50%", marginLeft: "18px" }}
                alt="user"
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
