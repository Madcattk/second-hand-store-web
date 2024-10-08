"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { editProductTypesById, getProductTypesById } from '@app/api/getAPI/product-type';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';

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
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const res = await getProductTypesById(id);
    setData(res?.data?.[0] || {});
    setLoading(false); // Set loading to false after data is fetched
  };

  const onFinish = async (form) => {
    const res = await editProductTypesById(form);
    if (res?.message === 'success') {
      toast.success("Product Types Edited.", {
        autoClose: 2000,
      });
      router.push('/backoffice/producttype');
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div> // Show a loading message or spinner while data is being fetched
      ) : (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          initialValues={data}
        >
          <Form.Item
            label="Product Type Id" name="Product_Type_Id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Product Type Name" name="Product_Type_Name"
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
              <Button onClick={() => router.push('/backoffice/producttype')} type="primary" danger>Back</Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default page;