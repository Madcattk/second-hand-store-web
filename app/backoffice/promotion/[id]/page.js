"use client"
import React from 'react';
import { Button, Form, Input, DatePicker,} from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
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
      name={['user', 'productname']}
      label="Promotion Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item label="Star Date">
      <DatePicker />
    </Form.Item>

    <Form.Item label="End Date">
      <DatePicker />
    </Form.Item>
     
    <Form.Item
      name={['user', 'discount']}
      label="Discount"
      rules={[
        {
          type: 'discount',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name={['user', 'pricecondition']}
      label="Price Cndition"
      rules={[
        {
          type: 'pricecondition',
        },
      ]}
    >
      <Input />
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