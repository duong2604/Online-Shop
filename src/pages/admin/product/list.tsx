import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TProduct } from "../../../schema/product";
import {
  useRemoveProductMutation,
  useProductQuery,
} from "../../../services/product";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const ProductAdmin: React.FC = () => {
  const { data } = useProductQuery();
  const [removeProduct] = useRemoveProductMutation();

  const [filter, setFilter] = useState({ ten_san_pham: "" });
  const [listProduct, setListProduct] = useState<TProduct[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeProduct(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TProduct> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 70,
      render: (index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten_san_pham",
      key: "ten_san_pham",
      width: 150,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "ma_san_pham",
      key: "ma_san_pham",
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
      width: 150,
    },
    {
      title: "Phù hợp sử dụng",
      dataIndex: "phu_hop_su_dung",
      key: "phu_hop_su_dung",
      width: 150,
    },
    {
      title: "ID CL dây đeo",
      dataIndex: "chat_lieu_day_deo_id",
      key: "chat_lieu_day_deo_id",
      width: 150,
    },
    {
      title: "ID chất liệu",
      dataIndex: "chat_lieu_id",
      key: "chat_lieu_id",
      width: 150,
    },
    {
      title: "ID họa tiết",
      dataIndex: "hoa_tiet_id",
      key: "hoa_tiet_id",
      width: 150,
    },
    {
      title: "ID kích thước",
      dataIndex: "kich_thuoc_id",
      key: "kich_thuoc_id",
      width: 150,
    },
    {
      title: "ID kiểu khóa",
      dataIndex: "kieu_khoa_id",
      key: "kieu_khoa_id",
      width: 150,
    },
    {
      title: "ID loại SP",
      dataIndex: "loai_san_pham_id",
      key: "loai_san_pham_id",
      width: 150,
    },
    {
      title: "ID Số ngăn",
      dataIndex: "so_ngan_id",
      key: "so_ngan_id",
      width: 150,
    },
    {
      title: "ID thương hiệu",
      dataIndex: "thuong_hieu_id",
      key: "thuong_hieu_id",
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
      render: (product) => (
        <div>
          <Link to={`edit/${product.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(product.id)}
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
      item.ten_san_pham
        ?.toLowerCase()
        .includes(filter.ten_san_pham.trim().toLowerCase())
    );
    setListProduct(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_san_pham === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_san_pham]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý sản phẩm</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm sản phẩm"
            value={filter?.ten_san_pham}
            onChange={(e) => handleFilterChange("ten_san_pham", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_san_pham: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/product/add">
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
          THÊM SẢN PHẨM
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listProduct} />
    </>
  );
};

export default ProductAdmin;
