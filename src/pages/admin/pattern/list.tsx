import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TPattern } from "../../../schema/pattern";
import {
  useRemovePatternMutation,
  usePatternQuery,
} from "../../../services/pattern";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const PatternAdmin: React.FC = () => {
  const { data } = usePatternQuery();
  const [removePattern] = useRemovePatternMutation();

  const [filter, setFilter] = useState({ ten_hoa_tiet: "" });
  const [listPattern, setListPattern] = useState<TPattern[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removePattern(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TPattern> = [
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
      dataIndex: "ten_hoa_tiet",
      key: "ten_hoa_tiet",
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
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (pattern) => (
        <div>
          <Link to={`edit/${pattern.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(pattern.id)}
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
      item.ten_hoa_tiet
        ?.toLowerCase()
        .includes(filter.ten_hoa_tiet.trim().toLowerCase())
    );
    setListPattern(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_hoa_tiet === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_hoa_tiet]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý họa tiết</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm họa tiết "
            value={filter?.ten_hoa_tiet}
            onChange={(e) => handleFilterChange("ten_hoa_tiet", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_hoa_tiet: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/pattern/add">
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
          THÊM HỌA TIẾT
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listPattern} />
    </>
  );
};

export default PatternAdmin;
