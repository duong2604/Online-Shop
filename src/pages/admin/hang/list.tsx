import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { THang } from "../../../schema/hang";
import { useRemoveHangMutation, useHangQuery } from "../../../services/hang";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const HangAdmin: React.FC = () => {
  const { data } = useHangQuery();
  const [removeHang] = useRemoveHangMutation();

  const [filter, setFilter] = useState({ ten_hang: "" });
  const [listHang, setListHang] = useState<THang[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeHang(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<THang> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "ten_hang",
      key: "ten_hang",
      width: 150,
    },
    {
      title: "Mã",
      dataIndex: "ma_hang",
      key: "ma_hang",
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
      render: (hang) => (
        <div>
          <Link to={`edit/${hang.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(hang.id)}
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
      item.ten_hang
        ?.toLowerCase()
        .includes(filter.ten_hang.trim().toLowerCase())
    );
    setListHang(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_hang === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_hang]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý hàng</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm hàng "
            value={filter?.ten_hang}
            onChange={(e) => handleFilterChange("ten_hang", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_hang: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/hang/add">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "13%",
            float: "right",
          }}
        >
          THÊM HÀNG
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listHang} />
    </>
  );
};

export default HangAdmin;
