import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TSale } from "../../../schema/sale";
import { useRemoveSaleMutation, useSaleQuery } from "../../../services/sale";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const SaleAdmin: React.FC = () => {
  const { data } = useSaleQuery();
  const [removeSale] = useRemoveSaleMutation();

  const [filter, setFilter] = useState({ tieu_de: "" });
  const [listSale, setListSale] = useState<TSale[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeSale(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TSale> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Giá trị giảm HĐ",
      dataIndex: "gia_tri_giam_hd",
      key: "gia_tri_giam_hd",
      width: 150,
    },
    {
      title: "Trạng thái mã giảm giá",
      dataIndex: "trang_thai_ma_giam_gia",
      key: "trang_thai_ma_giam_gia",
      width: 150,
    },
    {
      title: "Loại giảm giá HĐ",
      dataIndex: "loai_giam_gia_hd",
      key: "loai_giam_gia_hd",
      width: 150,
    },
    {
      title: "Loại ưu đãi",
      dataIndex: "loai_uu_dai",
      key: "loai_uu_dai",
      width: 150,
    },
    {
      title: "Mã giảm giá",
      dataIndex: "ma_giam_gia",
      key: "ma_giam_gia",
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
      width: 150,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      key: "ngay_bat_dau",
      width: 150,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngay_ket_thuc",
      key: "ngay_ket_thuc",
      width: 150,
    },
    {
      title: "Số tiền hóa đơn yêu cầu",
      dataIndex: "so_tien_hoa_don_yeu_cau",
      key: "so_tien_hoa_don_yeu_cau",
      width: 150,
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieu_de",
      key: "tieu_de",
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      key: "so_luong",
      width: 150,
    },
    {
      title: "ID hàng",
      dataIndex: "hang_id",
      key: "hang_id",
      width: 150,
    },
    {
      title: "ID chi tiết SP",
      dataIndex: "chi_tiet_san_pham_id",
      key: "chi_tiet_san_pham_id",
      width: 150,
    },
    {
      title: "ID danh mục AD",
      dataIndex: "danh_muc_ap_dung_id",
      key: "danh_muc_ap_dung_id",
      width: 150,
    },
    {
      title: "ID SP áp dụng",
      dataIndex: "san_pham_ap_dung_id",
      key: "san_pham_ap_dung_id",
      width: 150,
    },
    {
      title: "Đã sử dụng",
      dataIndex: "da_su_dung",
      key: "da_su_dung",
      width: 150,
    },
    {
      title: "Giới hạn sử dụng",
      dataIndex: "gioi_han_su_dung",
      key: "gioi_han_su_dung",
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
      render: (sale) => (
        <div>
          <Link to={`edit/${sale.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(sale.id)}
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
      item.tieu_de?.toLowerCase().includes(filter.tieu_de.trim().toLowerCase())
    );
    setListSale(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.tieu_de === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.tieu_de]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý mã giảm giá</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm mã giảm giá"
            value={filter?.tieu_de}
            onChange={(e) => handleFilterChange("tieu_de", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ tieu_de: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/sale/add">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "17%",
            float: "right",
          }}
        >
          THÊM MÃ GIẢM GIÁ
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listSale} />
    </>
  );
};

export default SaleAdmin;
