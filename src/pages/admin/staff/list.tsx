import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Image, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStaff } from "../../../schema/staff";
import { useRemoveStaffMutation, useStaffQuery } from "../../../services/staff";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const StaffAdmin: React.FC = () => {
  const { data } = useStaffQuery();
  const [removeStaff] = useRemoveStaffMutation();

  const [filter, setFilter] = useState({ ten_nhan_vien: "" });
  const [listStaff, setListStaff] = useState<TStaff[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeStaff(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStaff> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 100,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "ten_nhan_vien",
      key: "ten_nhan_vien",
      width: 150,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngay_sinh",
      key: "ngay_sinh",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "so_dien_thoai",
      key: "so_dien_thoai",
      width: 150,
    },
    {
      title: "Giới tính",
      dataIndex: "gioi_tinh",
      key: "gioi_tinh",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      key: "dia_chi",
      width: 150,
    },
    {
      title: "Căn cước công dân",
      dataIndex: "cccd",
      key: "cccd",
      width: 150,
    },

    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (image) => <Image width={100} src={image} />,
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
      item.ten_nhan_vien
        ?.toLowerCase()
        .includes(filter.ten_nhan_vien.trim().toLowerCase())
    );
    setListStaff(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_nhan_vien === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_nhan_vien]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý nhân viên</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm nhân viên"
            value={filter?.ten_nhan_vien}
            onChange={(e) =>
              handleFilterChange("ten_nhan_vien", e.target.value)
            }
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_nhan_vien: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/staff/add">
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
          THÊM NHÂN VIÊN
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listStaff} />
    </>
  );
};

export default StaffAdmin;
