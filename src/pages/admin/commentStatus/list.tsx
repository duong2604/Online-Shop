import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TCommentStatus } from "../../../schema/commentStatus";
import {
  useRemoveCommentStatusMutation,
  useCommentStatusQuery,
} from "../../../services/commentStatus";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const CommentStatusAdmin: React.FC = () => {
  const { data } = useCommentStatusQuery();
  const [removeCommentStatus] = useRemoveCommentStatusMutation();

  const [filter, setFilter] = useState({ comment_status_name: "" });
  const [listCommentStatus, setListCommentStatus] = useState<
    TCommentStatus[] | undefined
  >([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeCommentStatus(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TCommentStatus> = [
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
      dataIndex: "comment_status_name",
      key: "comment_status_name",
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
      render: (commentStatus) => (
        <div>
          <Link to={`edit/${commentStatus.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(commentStatus.id)}
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
      item.comment_status_name
        ?.toLowerCase()
        .includes(filter.comment_status_name.trim().toLowerCase())
    );
    setListCommentStatus(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.comment_status_name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.comment_status_name]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý trạng thái</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm trạng thái"
            value={filter?.comment_status_name}
            onChange={(e) =>
              handleFilterChange("comment_status_name", e.target.value)
            }
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ comment_status_name: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/commentStatus/add">
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
          THÊM TRẠNG THÁI
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listCommentStatus} />
    </>
  );
};

export default CommentStatusAdmin;
