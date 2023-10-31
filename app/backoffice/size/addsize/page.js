"use client"
import React from 'react';
import { Button, Form, Input } from 'antd';
import { addSize } from '@app/api/getAPI/size';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { useRouter } from 'next/navigation';

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

const page = () => {
  const router = useRouter();
  const onFinish = async (form) => {
    const res = await addSize(form?.form);
    if (res?.message === 'success') {
      toast.success("Size Added.", {
        autoClose: 2000,
      });
    }
    router.push('/backoffice/size');
  };

  return (
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
        label="Size Name" name={['form', 'Size_Name']}
        rules={[
          {
            required: true,
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
        <div className="flex space-x-4">
          <Button htmlType="submit" type="primary" danger>Submit</Button>
          <Button onClick={() => router.push('/backoffice/size')} type="primary" danger>Back</Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default page;