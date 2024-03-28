/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate } from "react-router-dom";
import LogOutIcon from "../../assets/svg/logOut";
import UserIcon from "../../assets/svg/userIcon";
import "../../assets/scss/layouts/admin/modal.scss";
import userImg from "../../assets/images/user.png";

type Props = {};

const ModalUser = (props: Props) => {
  const logout = async () => {
    await localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="model-user">
      <div className="model-user-title">
        <div className="model-user-title-image">
          <img src={userImg} alt="user" />
        </div>

        <div className="model-user-title-text">
          <div className="name">Tên</div>
          <div className="role">role</div>
        </div>
      </div>
      <hr />
      <div className="model-user-content">
        <div className="model-user-content-item">
          <div>
            <UserIcon />
          </div>
          <div>Hồ sơ</div>
        </div>
      </div>
      <hr />
      <div
        className="model-user-logout"
        onClick={() => {
          logout();
        }}
      >
        <div>
          <LogOutIcon />
        </div>
        <div>Đăng xuất</div>
      </div>
    </div>
  );
};

export default ModalUser;
