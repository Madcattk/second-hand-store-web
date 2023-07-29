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
    const res = await getSizeById(id);
    setData(res?.data?.[0] || {});
    setLoading(false); // Set loading to false after data is fetched
  };

  const onFinish = async (form) => {
    const res = await editSizeById(form);
    if (res?.message === 'success') {
      toast.success("Size Edited.", {
        autoClose: 2000,
      });
      router.push('/backoffice/size');
    }
  };
  //   const onFinish = (values) => {
  //     console.log(DateFormat(values.form.startDate));
  //     console.log(DateFormat(values.form.endDate));

  // };


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
            label="Promotion Id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
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


          <Form.Item label="Promotion Start Date" name={['form', 'startDate']}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Promotion_End_Date" name={['form', 'endDate']}>
            <DatePicker />
          </Form.Item>


          <Form.Item
            name="Promotion_Discount"
            label="Promotion Discount"
            rules={[
              {
                type: 'Promotion Discount',
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
                type: 'Promotion Price Condition',
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
      )}
    </>
  );
}

export default App;