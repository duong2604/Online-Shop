/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate } from "react-router-dom";

type Props = {};

const ModalUser = (props: Props) => {
  const logout = async () => {
    await localStorage.removeItem("token");
    window.location.reload();
    // navigate("/signin");
  };
  return (
    <div className="model-user">
      <div className="model-user-title">
        <div className="model-user-title-text">
          <div className="name">{}</div>
          <div className="role">{}</div>
        </div>
      </div>
      <hr />
      <div className="model-user-content">
        <div className="model-user-content-item">
          <div>{/* <UserIcon /> */}</div>
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
        <div>{/* <LogoutIcon /> */}</div>
        <div>Đăng xuất</div>
      </div>
    </div>
  );
};

export default ModalUser;
