import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TSize } from "../../../schema/kich_co";
import { useRemoveSizeMutation, useSizeQuery } from "../../../services/kich_co";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const SizeAdmin: React.FC = () => {
  const { data } = useSizeQuery();
  const [removeSize] = useRemoveSizeMutation();

  const [filter, setFilter] = useState({ ten_kich_co: "" });
  const [listSize, setListSize] = useState<TSize[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeSize(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TSize> = [
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
      dataIndex: "ten_kich_co",
      key: "ten_kich_co",
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
      item.ten_kich_co
        ?.toLowerCase()
        .includes(filter.ten_kich_co.trim().toLowerCase())
    );
    setListSize(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_kich_co === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_kich_co]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý kích cỡ</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm kích cỡ "
            value={filter?.ten_kich_co}
            onChange={(e) => handleFilterChange("ten_kich_co", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_kich_co: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/size/add">
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
          THÊM KÍCH CỠ
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listSize} />
    </>
  );
};

export default SizeAdmin;
