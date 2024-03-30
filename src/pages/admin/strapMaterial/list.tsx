import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStrapMaterial } from "../../../schema/strapMaterial";
import {
  useRemoveStrapMaterialMutation,
  useStrapMaterialQuery,
} from "../../../services/strapMaterial";
import Search from "antd/es/input/Search";
import "../../../assets/scss/layouts/admin/appointments.scss";

const StrapMaterialAdmin: React.FC = () => {
  const { data } = useStrapMaterialQuery();
  const [removeStrapMaterial] = useRemoveStrapMaterialMutation();

  const [filter, setFilter] = useState({ ten_chat_lieu_day_deo: "" });
  const [listStrapMaterial, setListStrapMaterial] = useState<
    TStrapMaterial[] | undefined
  >([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeStrapMaterial(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStrapMaterial> = [
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
      dataIndex: "ten_chat_lieu_day_deo",
      key: "ten_chat_lieu_day_deo",
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
      render: (strapMaterial) => (
        <div>
          <Link to={`edit/${strapMaterial.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(strapMaterial.id)}
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
      item.ten_chat_lieu_day_deo
        ?.toLowerCase()
        .includes(filter.ten_chat_lieu_day_deo.trim().toLowerCase())
    );
    setListStrapMaterial(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.ten_chat_lieu_day_deo === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.ten_chat_lieu_day_deo]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý chất liệu dây đeo</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm chất liệu dây đeo"
            value={filter?.ten_chat_lieu_day_deo}
            onChange={(e) =>
              handleFilterChange("ten_chat_lieu_day_deo", e.target.value)
            }
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ ten_chat_lieu_day_deo: "" })}
            danger
            disabled={!openReset}
          >
            Mặc định
          </Button>
        </div>
      </div>
      <Link to="/admin/strapMaterial/add">
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
          THÊM CHẤT LIỆU DÂY ĐEO
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listStrapMaterial} />
    </>
  );
};

export default StrapMaterialAdmin;
