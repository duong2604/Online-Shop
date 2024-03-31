import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TClient } from "../../../schema/client";
import {
  useRemoveClientMutation,
  useClientQuery,
} from "../../../services/client";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const ClientAdmin: React.FC = () => {
  const { data } = useClientQuery();
  const [removeClient] = useRemoveClientMutation();

  const [filter, setFilter] = useState({ ten_khach_hang: "" });
  const [listClient, setListClient] = useState<TClient[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeClient(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TClient> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 70,
      render: (index) => index + 1,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "ten_khach_hang",
      key: "ten_khach_hang",
      width: 150,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngay_sinh",
      key: "ngay_sinh",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "so_dien_thoai",
      key: "so_dien_thoai",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "diem_tich_luy",
      key: "diem_tich_luy",
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
      title: "ID Hàng",
      dataIndex: "hang_id",
      key: "hang_id",
      width: 150,
    },
    {
      title: "ID User",
      dataIndex: "user_id",
      key: "user_id",
      width: 150,
    },
    {
      title: "Kích hoạt email",
      dataIndex: "kich_hoat_email",
      key: "kich_hoat_email",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (client) => (
        <div>
          <Link to={`edit/${client.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(client.id)}
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
      item.ten_khach_hang
        ?.toLowerCase()
        .includes(filter.ten_khach_hang.trim().toLowerCase())
    );
    setListClient(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_khach_hang === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_khach_hang]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý khách hàng</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm khách hàng"
            value={filter?.ten_khach_hang}
            onChange={(e) =>
              handleFilterChange("ten_khach_hang", e.target.value)
            }
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_khach_hang: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/client/add">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "19%",
            float: "right",
          }}
        >
          THÊM KHÁCH HÀNG
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listClient} />
    </>
  );
};

export default ClientAdmin;
