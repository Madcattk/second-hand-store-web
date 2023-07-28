"use client"
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Upload } from 'antd';
import { InputFile, WhiteInputFile } from '@components/inputs';
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
  },
};
/* eslint-enable no-template-curly-in-string */

const App = () => {
  const [image, setImage] = useState(null);
  const onChange = (update) => setImage(update)

  const onFinish = (values) => {
    let data = {...values, Employee_Image: image?.image || null}
    console.log(data);
  };
  return(
    <>
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
      name={['user', 'address']}
      label="Address"
      rules={[
        {
          type: 'address',
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

    <div className='w-full flex justify-center'>
    <WhiteInputFile onChange={(image) => onChange({ image })} value={image?.image || ''} placeholder='Profile Picture' classBox='w-[50%]'/>
    </div>

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
  
    </>
  )
}
export default App;