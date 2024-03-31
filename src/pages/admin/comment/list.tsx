import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TComment } from "../../../schema/comment";
import {
  useRemoveCommentMutation,
  useCommentQuery,
} from "../../../services/comment";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const CommentAdmin: React.FC = () => {
  const { data } = useCommentQuery();
  const [removeComment] = useRemoveCommentMutation();

  const [filter, setFilter] = useState({ ho_ten: "" });
  const [listComment, setListComment] = useState<TComment[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeComment(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TComment> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "ho_ten",
      key: "ho_ten",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },

    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      width: 150,
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
      width: 150,
    },
    {
      title: "Điểm đánh giá",
      dataIndex: "diem_danh_gia",
      key: "diem_danh_gia",
      width: 150,
    },
    {
      title: "ID Chi tiết sp",
      dataIndex: "chi_tiet_san_pham_id",
      key: "chi_tiet_san_pham_id",
      width: 150,
    },
    {
      title: "TT bình luận",
      dataIndex: "trang_thai_binh_luan",
      key: "trang_thai_binh_luan",
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
      render: (comment) => (
        <div>
          <Link to={`edit/${comment.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(comment.id)}
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
      item.ho_ten?.toLowerCase().includes(filter.ho_ten.trim().toLowerCase())
    );
    setListComment(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ho_ten === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ho_ten]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý bình luận</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm bình luận "
            value={filter?.ho_ten}
            onChange={(e) => handleFilterChange("ho_ten", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ho_ten: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>

      <TableAdmin columns={columns} data={listComment} />
    </>
  );
};

export default CommentAdmin;
