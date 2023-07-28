"use client"
import React from 'react';
import { Button, Form, Select } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


const onFinish = (values) => {
  console.log(values);
};
const App = () => (
  <Form
  
  >
    <div className='font-extralight text-3xl pb-16'>Report Summary</div>
    <Form.Item label="Sex">
      <Select>
        <Select.Option value="categorizedbestselle">Categorized Best Selle</Select.Option>
        <Select.Option value="salessummary">Sales Summary</Select.Option>
      </Select>
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