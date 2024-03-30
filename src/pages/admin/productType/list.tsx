import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TProductType } from "../../../schema/productType";
import {
  useRemoveProductTypeMutation,
  useProductTypeQuery,
} from "../../../services/productType";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const ProductTypeAdmin: React.FC = () => {
  const { data } = useProductTypeQuery();
  const [removeProductType] = useRemoveProductTypeMutation();

  const [filter, setFilter] = useState({ ten_loai: "" });
  const [listProductType, setListProductType] = useState<
    TProductType[] | undefined
  >([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeProductType(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TProductType> = [
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
      dataIndex: "ten_loai",
      key: "ten_loai",
      width: 150,
    },
    {
      title: "Mã",
      dataIndex: "ma_loai",
      key: "ma_loai",
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
      render: (productType) => (
        <div>
          <Link to={`edit/${productType.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(productType.id)}
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
      item.ten_loai
        ?.toLowerCase()
        .includes(filter.ten_loai.trim().toLowerCase())
    );
    setListProductType(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_loai === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_loai]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý loại sản phẩm</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm loại sản phẩm "
            value={filter?.ten_loai}
            onChange={(e) => handleFilterChange("ten_loai", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_loai: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/productType/add">
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
          THÊM LOẠI SẢN PHẨM
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listProductType} />
    </>
  );
};

export default ProductTypeAdmin;
