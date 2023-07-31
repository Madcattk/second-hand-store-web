"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { useParams, useRouter } from 'next/navigation';
import { editProductById, getProductById } from '@app/api/getAPI/product';
import { WhiteInputFile } from '@components/inputs';


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

  const [image, setImage] = useState(null);
  const onChange = (update) => setImage(update)

  const onFinish = (values) => {
    let data = { ...values, Product_Image: image?.image || null }
    console.log(data);

  };

  const onLoad = async () => {
    const res = await getProductById(id);
    setData(res?.data?.[0] || {});
    setLoading(false); // Set loading to false after data is fetched
  };

  // const onFinish = async (form) => {
  //   const res = await editProductById(form);
  //   if (res?.message === 'success') {
  //     toast.success("Product Edited.", {
  //       autoClose: 2000,
  //     });
  //     router.push('/backoffice/product');
  //   }
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
          validateMessages={validateMessages}
          initialValues={data}
        >

          <Form.Item
            name="Product_Id"
            label="Product Id"
            rules={[
              {
                type: 'Product Id',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Product_Name"
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
            name="Product_Price"
            label="Product_Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Product_Description"
            label="Product Description"
            rules={[
              {
                type: 'Product Description',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Product Sex">
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Product date">
            <DatePicker />
          </Form.Item>


          <Form.Item label="Product Status">
            <Select>
              <Select.Option value="unavailable">Unavailable</Select.Option>
              <Select.Option value="available">Available</Select.Option>
            </Select>

          </Form.Item>

          <Form.Item
            name="Product_Type_Id"
            label="Product Type Id"
            rules={[
              {
                type: 'Product Type Id',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Size_Id"
            label="Size Id"
            rules={[
              {
                type: 'Size Id',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Product_Size_Detail"
            label="Product Size Detail"
            rules={[
              {
                type: 'Product Size Detail',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Size_Id"
            label="Sale Id"
            rules={[
              {
                type: 'Sale Id',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className='w-full flex justify-center'>
          <WhiteInputFile onChange={(image) => onChange({ image })} value={image?.image || ''} placeholder='Profile Picture' classBox='w-[50%]' />
        </div>

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