import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TSizee } from "../../../schema/kich_thuoc";
import {
  useRemoveSizeeMutation,
  useSizeeQuery,
} from "../../../services/kich_thuoc";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const SizeeAdmin: React.FC = () => {
  const { data } = useSizeeQuery();
  const [removeSizee] = useRemoveSizeeMutation();

  const [filter, setFilter] = useState({ chieu_cao: "" });
  const [listSizee, setListSizee] = useState<TSizee[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeSizee(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TSizee> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
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
      title: "Chiều cao",
      dataIndex: "chieu_cao",
      key: "chieu_cao",
      width: 100,
      render: (chieu_cao) => `${chieu_cao} ( cm )`,
    },
    {
      title: "Chiều dai",
      dataIndex: "chieu_dai",
      key: "chieu_dai",
      width: 100,
      render: (chieu_dai) => `${chieu_dai} ( cm )`,
    },
    {
      title: "Chiều rộng",
      dataIndex: "chieu_rong",
      key: "chieu_rong",
      width: 100,
      render: (chieu_rong) => `${chieu_rong} ( cm )`,
    },
    {
      title: "ID kích cỡ",
      dataIndex: "kich_co_id",
      key: "kich_co_id",
      width: 100,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (sizee) => (
        <div>
          <Link to={`edit/${sizee.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(sizee.id)}
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
      item.chieu_cao
        ?.toLowerCase()
        .includes(filter.chieu_cao.trim().toLowerCase())
    );
    setListSizee(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.chieu_cao === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.chieu_cao]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý kích thước</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm chiều cao "
            value={filter?.chieu_cao}
            onChange={(e) => handleFilterChange("chieu_cao", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ chieu_cao: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/sizee/add">
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
          THÊM KÍCH THƯỚC
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listSizee} />
    </>
  );
};

export default SizeeAdmin;
