import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TDiscountCode } from "../../../schema/discountCode";
import {
  useRemoveDiscountCodeMutation,
  useDiscountCodeQuery,
} from "../../../services/discountCode";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const DiscountCodeAdmin: React.FC = () => {
  const { data } = useDiscountCodeQuery();
  const [removeDiscountCode] = useRemoveDiscountCodeMutation();

  const [filter, setFilter] = useState({ ten_dot_giam_gia: "" });
  const [listDiscountCode, setListDiscountCode] = useState<
    TDiscountCode[] | undefined
  >([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeDiscountCode(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TDiscountCode> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "ten_dot_giam_gia",
      key: "ten_dot_giam_gia",
      width: 150,
    },
    {
      title: "Giá trị",
      dataIndex: "gia_tri_giam_hd",
      key: "gia_tri_giam_hd",
      width: 150,
    },
    {
      title: "Loại giảm giá",
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
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      key: "ngay_bat_dau",
      width: 150,
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngay_ket_thuc",
      key: "ngay_ket_thuc",
      width: 150,
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Số tiền yêu cầu",
      dataIndex: "so_tien_hoa_don_yeu_cau",
      key: "so_tien_hoa_don_yeu_cau",
      width: 150,
      render: (text) => <span>{text.toLocaleString()} ( VNĐ )</span>,
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
      title: "Trạng thái",
      dataIndex: "trang_thai_dot_giam_gia",
      key: "trang_thai_dot_giam_gia",
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
      item.ten_dot_giam_gia
        ?.toLowerCase()
        .includes(filter.ten_dot_giam_gia.trim().toLowerCase())
    );
    setListDiscountCode(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_dot_giam_gia === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_dot_giam_gia]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý đợt giảm giá</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm đợt giảm giá "
            value={filter?.ten_dot_giam_gia}
            onChange={(e) =>
              handleFilterChange("ten_dot_giam_gia", e.target.value)
            }
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_dot_giam_gia: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/discountCode/add">
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
          THÊM ĐỢT GIẢM GIÁ
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listDiscountCode} />
    </>
  );
};

export default DiscountCodeAdmin;
