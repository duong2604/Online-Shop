import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TCategory } from "../../../schema/category";
import {
  useRemoveCategoryMutation,
  useCategoryQuery,
} from "../../../services/category";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const CategoryAdmin: React.FC = () => {
  const { data } = useCategoryQuery();
  const [removeCategory] = useRemoveCategoryMutation();

  const [filter, setFilter] = useState({ ten_danh_muc: "" });
  const [listCategory, setListCategory] = useState<TCategory[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeCategory(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TCategory> = [
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
      dataIndex: "ten_danh_muc",
      key: "ten_danh_muc",
      width: 150,
    },
    {
      title: "Mã",
      dataIndex: "ma_danh_muc",
      key: "ma_mau",
      width: 150,
    },
    {
      title: "Is Parent",
      dataIndex: "is_parent",
      key: "is_parent",
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
      render: (category) => (
        <div>
          <Link to={`edit/${category.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(category.id)}
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
      item.ten_danh_muc
        ?.toLowerCase()
        .includes(filter.ten_danh_muc.trim().toLowerCase())
    );
    setListCategory(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_danh_muc === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_danh_muc]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý danh mục</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm danh mục "
            value={filter?.ten_danh_muc}
            onChange={(e) => handleFilterChange("ten_danh_muc", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_danh_muc: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/category/add">
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
          THÊM DANH MỤC
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listCategory} />
    </>
  );
};

export default CategoryAdmin;
