"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { editPromotionById, getPromotionById } from '@app/api/getAPI/promotion';
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

const App = () => {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const res = await getPromotionById(id);
    setData(res?.data?.[0] || {});
    setLoading(false); // Set loading to false after data is fetched
  };

  const onFinish = async ({ form, ...restValues }) => {
    const updatedValues = {
      ...restValues,
      Promotion_Start_Date: form?.Promotion_Start_Date,
      Promotion_End_Date: form?.Promotion_End_Date,
      
    };
    const res = await editPromotionById(updatedValues);
    if (res?.message === 'success') {
      toast.success("Promotion Edited.", {
        autoClose: 2000,
      });
      router.push('/backoffice/promotion');
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
          initialValues={data}
        >
          <Form.Item
            name="Promotion_Id"
            label="Promotion Id">
             <Input disabled/>
          </Form.Item>
          <Form.Item
            name="Promotion_Name"
            label="Promotion Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Promotion Start Date" name={['form', 'Promotion_Start_Date']}
          rules={[
            {
              required: true,
            },
          ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Promotion_End_Date" name={['form', 'Promotion_End_Date']}
          rules={[
            {
              required: true,
            },
          ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="Promotion_Discount"
            label="Promotion Discount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Promotion_Price_Condition"
            label="Promotion Price Condition"
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
            <Button htmlType="submit" type="primary" danger>
            Submit
          </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default App;