import { Outlet } from "react-router-dom";
import ContentTop from "./contentTop";
import "../../assets/scss/layouts/admin/content.scss";
const Content = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <Outlet />
    </div>
  );
};

export default Content;
