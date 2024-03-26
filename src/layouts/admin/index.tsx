/* eslint-disable @typescript-eslint/ban-types */
import { FC } from "react";
// import { useGetUserQuery } from "../../services/user";
import "../../assets/scss/layouts/admin/index.scss";
import "../../assets/scss/layouts/admin/sidebar.scss";
import Sidebar from "./Sidebar";
import Content from "./content";
type Props = {};

const LayoutAdmin: FC<Props> = () => {
  // const navigate = useNavigate();
  // const { data: user, isLoading } = useGetUserQuery();
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!user) {
  //       navigate("/signin");
  //     } else if (user.role_id !== 1 && user.role_id !== 10) {
  //       navigate("/");
  //     }
  //   }
  // }, [user, navigate, isLoading]);

  return (
    <div>
      <div className="app">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default LayoutAdmin;
