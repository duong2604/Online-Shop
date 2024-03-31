import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TUser } from "../../../schema/user";
import { useRemoveUserMutation, useUserQuery } from "../../../services/user";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const UserAdmin: React.FC = () => {
  const { data } = useUserQuery();
  const [removeUser] = useRemoveUserMutation();

  const [filter, setFilter] = useState({ user_name: "" });
  const [listUser, setListUser] = useState<TUser[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeUser(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TUser> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "user_name",
      key: "user_name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
      width: 150,
    },
    {
      title: "Thời gian tạo",
      dataIndex: "create_date",
      key: "create_date",
      width: 150,
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "update_date",
      key: "update_date",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (user) => (
        <div>
          <Link to={`edit/${user.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(user.id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.user_name
        ?.toLowerCase()
        .includes(filter.user_name.trim().toLowerCase())
    );
    setListUser(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.user_name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.user_name]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý người dùng</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm người dùng"
            value={filter?.user_name}
            onChange={(e) => handleFilterChange("user_name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ user_name: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>

      <TableAdmin columns={columns} data={listUser} />
    </>
  );
};

export default UserAdmin;
