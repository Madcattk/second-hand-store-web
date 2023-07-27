"use client"
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Upload } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};
const App = () => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'product name']}
      label="Product Name"
      rules={[
        {
          required: true,
        },
       
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'price']}
      label="Price"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name={['user', 'description']}
      label="Description"
      rules={[
        {
          type: 'Description',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item label="Sex">
      <Select>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
        <Select.Option value="others">Others</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item label="Status">
      <Select>
        <Select.Option value="unavailable">Unavailable</Select.Option>
        <Select.Option value="available">Available</Select.Option>
      </Select>

    </Form.Item>

    <Form.Item label="Product date">
      <DatePicker />
    </Form.Item>

    <Form.Item
      name="upload"
      label="Upload"
      getValueFromEvent={normFile}
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Product Image</Button>
      </Upload>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default App;