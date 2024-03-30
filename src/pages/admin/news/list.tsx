import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Image, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TNews } from "../../../schema/news";
import { useRemoveNewsMutation, useNewsQuery } from "../../../services/news";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const NewsAdmin: React.FC = () => {
  const { data } = useNewsQuery();
  const [removeNews] = useRemoveNewsMutation();

  const [filter, setFilter] = useState({ title: "" });
  const [listNews, setListNews] = useState<TNews[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeNews(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TNews> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 100,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (title) =>
        title.length > 100 ? `${title.substring(0, 100)}...` : title,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: 150,
      render: (content) =>
        content.length > 150 ? `${content.substring(0, 150)}...` : content,
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
      item.title?.toLowerCase().includes(filter.title.trim().toLowerCase())
    );
    setListNews(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.title === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.title]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý tin tức</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm tin tức "
            value={filter?.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ title: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/news/add">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "13%",
            float: "right",
          }}
        >
          THÊM TIN TỨC
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listNews} />
    </>
  );
};

export default NewsAdmin;
