"use client"
import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Upload} from 'antd';
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
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
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
      name={['user', 'id']}
      label="ID"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'name']}
      label="FristName"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'lastname']}
      label="LastName"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'password']}
      label="Password"
      rules={[
        {
          type: 'password',
        },
      ]}
    >
      <Input />
    </Form.Item>

    
    <Form.Item
      name={['user', 'phone']}
      label="Phone"
      rules={[
        {
          type: 'phone',
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
   
        <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>

      <Form.Item
      name="upload"
      label="Upload"
      getValueFromEvent={normFile}
      extra="Image"
      
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
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