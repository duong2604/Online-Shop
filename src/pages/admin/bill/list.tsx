/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import TableAdmin from "../../../components/table";
import { TBill } from "../../../schema/bill";
import { useRemoveBillMutation, useBillQuery } from "../../../services/bill";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { useReactToPrint } from "react-to-print";

const BillAdmin: React.FC = () => {
  const { data } = useBillQuery();
  const [removeBill] = useRemoveBillMutation();

  const [filter, setFilter] = useState({ ma_hoa_don: "" });
  const [listBill, setListBill] = useState<TBill[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeBill(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const componentRef = useRef<HTMLDivElement | null>(null);
  const [printButtonVisible, setPrintButtonVisible] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => {
      try {
        if (componentRef.current) {
          setPrintButtonVisible(false);
          return componentRef.current;
        }
        return null;
      } catch (error) {
        console.error("Error in handlePrint:", error);
        return null;
      }
    },

    onAfterPrint: () => {
      setPrintButtonVisible(true);
    },
  });

  const columns: ColumnsType<TBill> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghi_chu",
      key: "ghi_chu",
      width: 150,
    },
    {
      title: "Hình thức mua hàng",
      dataIndex: "hinh_thuc_mua_hang",
      key: "hinh_thuc_mua_hang",
      width: 150,
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "hinh_thuc_thanh_toan",
      key: "hinh_thuc_thanh_toan",
      width: 150,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "ma_hoa_don",
      key: "ma_hoa_don",
      width: 150,
    },
    {
      title: "Ngày lập",
      dataIndex: "ngay_lap",
      key: "ngay_lap",
      width: 150,
    },
    {
      title: "Phí ship",
      dataIndex: "phi_ship",
      key: "phi_ship",
      width: 150,
    },
    {
      title: "Tiền giảm ship",
      dataIndex: "tien_giam_ship",
      key: "tien_giam_ship",
      width: 150,
    },
    {
      title: "Tổng tiền được giảm event",
      dataIndex: "tong_tien_duoc_giam_event",
      key: "tong_tien_duoc_giam_event",
      width: 150,
    },
    {
      title: "Tổng tiền được giảm voucher",
      dataIndex: "tong_tien_duoc_giam_voucher",
      key: "tong_tien_duoc_giam_voucher",
      width: 150,
    },
    {
      title: "Tổng tiền tạm tính",
      dataIndex: "tong_tien_tam_tinh",
      key: "tong_tien_tam_tinh",
      width: 150,
    },
    {
      title: "Tổng tiền thanh toán",
      dataIndex: "tong_tien_thanh_toan",
      key: "tong_tien_thanh_toan",
      width: 150,
    },
    {
      title: "Trạng thái hóa đơn",
      dataIndex: "trang_thai_hoa_don",
      key: "trang_thai_hoa_don",
      width: 150,
    },
    {
      title: "ID địa chỉ",
      dataIndex: "dia_chi_id",
      key: "dia_chi_id",
      width: 150,
    },
    {
      title: "ID khách hàng",
      dataIndex: "khach_hang_id",
      key: "khach_hang_id",
      width: 150,
    },
    {
      title: "ID nhân viên",
      dataIndex: "nhan_vien_id",
      key: "nhan_vien_id",
      width: 150,
    },
    {
      title: "Nhận được tiền",
      dataIndex: "nhan_duoc_tien",
      key: "nhan_duoc_tien",
      width: 150,
    },
    {
      title: "Đã thanh toán",
      dataIndex: "da_thanh_toan",
      key: "da_thanh_toan",
      width: 150,
    },
    {
      title: "ID nhân viên xác nhận",
      dataIndex: "nhan_vien_xac_nhan_id",
      key: "nhan_vien_xac_nhan_id",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (bill) => (
        <div>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(bill.id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>

          <Button className="btn-print" onClick={handlePrint}>
            In
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.ma_hoa_don
        ?.toLowerCase()
        .includes(filter.ma_hoa_don.trim().toLowerCase())
    );
    setListBill(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ma_hoa_don === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ma_hoa_don]);
  return (
    <>
      <div ref={componentRef}>
        <h2 className="title-appoiment">Quản lý hóa đơn</h2>
        <div className="btn-table">
          <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
          <div style={{ display: "flex", columnGap: 20 }}>
            <Search
              placeholder="Tìm kiếm hóa đơn"
              value={filter?.ma_hoa_don}
              onChange={(e) => handleFilterChange("ma_hoa_don", e.target.value)}
              style={{ width: 200, marginBottom: 10 }}
            />
            <Button
              onClick={() => setFilter({ ma_hoa_don: "" })}
              danger
              disabled={!openReset}
            >
              Mặc định
            </Button>
          </div>
        </div>

        <TableAdmin columns={columns} data={listBill} />
      </div>
    </>
  );
};

export default BillAdmin;
