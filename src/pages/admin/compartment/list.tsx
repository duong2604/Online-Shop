import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TCompartment } from "../../../schema/compartment";
import {
  useRemoveCompartmentMutation,
  useCompartmentQuery,
} from "../../../services/compartment";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const CompartmentAdmin: React.FC = () => {
  const { data } = useCompartmentQuery();
  const [removeCompartment] = useRemoveCompartmentMutation();

  const [filter, setFilter] = useState({ ten_so_ngan: "" });
  const [listCompartment, setListCompartment] = useState<
    TCompartment[] | undefined
  >([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeCompartment(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TCompartment> = [
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
      dataIndex: "ten_so_ngan",
      key: "ten_so_ngan",
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
      render: (size) => (
        <div>
          <Link to={`edit/${size.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(size.id)}
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
      item.ten_so_ngan
        ?.toLowerCase()
        .includes(filter.ten_so_ngan.trim().toLowerCase())
    );
    setListCompartment(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_so_ngan === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_so_ngan]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý số ngăn</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm số ngăn "
            value={filter?.ten_so_ngan}
            onChange={(e) => handleFilterChange("ten_so_ngan", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_so_ngan: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/compartment/add">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "15%",
            float: "right",
          }}
        >
          THÊM SỐ NGĂN
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listCompartment} />
    </>
  );
};

export default CompartmentAdmin;
