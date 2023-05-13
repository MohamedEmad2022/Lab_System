import React, { useState, useEffect, useCallback } from "react";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  InputNumber,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Popconfirm,
} from "antd";
import {
  createAsset,
  retrieveAssets,
  selectAsset,
  deleteAsset,
  updateAsset,
} from "../../store/AdminActions/assetSlice.js";

const Assets = () => {
  let { assets, loading, selectedAsset, success } = useSelector(state => state.assets);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  assets = assets.map((asset) => {
    return { ...asset, key: asset.id };
  });

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
    },
    {
      title: "القيمة",
      dataIndex: "cost",
    },
    {
      title: "ملاحظات",
      dataIndex: "notes",
    },
    {
      title: "العمليات",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Row gutter={3}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => editModal(record)}
            >
              تعديل
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title="حذف نوع"
              description="هل تريد حذف هذا النوع"
              onConfirm={() => handleDeleteAsset(record.id)}
              okText="حذف"
              cancelText="رجوع"
            >
              <Button icon={<DeleteOutlined />} type="primary" danger>
                حذف
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  const handleFinish = (values) => {
    edit ? handleUpdateAsset(values) : handleAddAsset(values);
    setOpen(false);
  };

  const handleAddAsset = (values) => {
    dispatch(createAsset({ payload: values }));
  };

  const handleUpdateAsset = (values) => {
    values = { ...values, id: selectedAsset.id };
    dispatch(updateAsset({ payload: values }));
    console.log(values);
  };
  const handleDeleteAsset = (id) => {
    dispatch(deleteAsset({ id }));
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveAssets({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const AddModal = () => {
    form.setFieldsValue({
      name: "",
      cost: 0,
      notes: "",
    });
    setEdit(false);
    setOpen(true);
  };

  const editModal = (record) => {
    console.log(record);
    form.setFieldsValue({
      ...record,
    });
    dispatch(selectAsset(record));
    setEdit(true);
    setOpen(true);
  };

  const modalUI = () => {
    return (
      <Modal
        title=" الأصول الثابتة"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          dir="rtl"
          labelCol={{ span: 24 }}
        >
          <Form.Item
            name="name"
            label="اسم الأصل"
            rules={[
              {
                required: true,
                message: "من فضلك أدخل  اسم الأصل",
              },
            ]}
          >
            <Input placeholder="اسم الأصل " />
          </Form.Item>

          <Form.Item
            name="cost"
            label="التكلفة"
            rules={[
              {
                required: true,
                message: "من فضلك ادخل التكلفة",
              },
            ]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>

          <Form.Item name="notes" label="ملاحظات">
            <Input.TextArea placeholder="ملاحظات" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              {edit ? "تعديل" : "اضافة"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  return (
    <div>
      {modalUI()}
    
      <Row gutter={16} style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <Col>
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={AddModal}
          >
            اضافة
          </Button>
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={assets}
      />
    </div>
  );
};

export default Assets;
