"use client"
import React, { useState } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { WhiteInputFile } from '@components/inputs';
import { getAllProducts } from '@app/api/getAPI/product';
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

const App = () => {
  const router = useRouter();

  // const onFinish = async (form) => {
  //   const res = await addSize(form?.form);
  //   if (res?.message === 'success') {
  //     toast.success("Size Added.", {
  //       autoClose: 2000,
  //     });
  //   }
  //   router.push('/backoffice/size');
  // };

  const [image, setImage] = useState(null);
  const onChange = (update) => setImage(update)

  const onFinish = (values) => {
    let data = { ...values, Product_Image: image?.image || null }
    console.log(data);
  };
  return (
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
          name={['form', 'Product_Name']}
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
          name={['form', 'Product_Price']}
          label="Product Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['form', 'Product_Description']}
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

        <Form.Item 
          label="Product Date"
          name={['form', 'productDate']}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Product Status">
          <Select>
            <Select.Option value="unavailable">Unavailable</Select.Option>
            <Select.Option value="available">Available</Select.Option>
          </Select>

        </Form.Item>

        <Form.Item
          name={['form', 'Product_Type_Id	']}
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
          name={['form', 'Size_Id	']}
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
          name={['form', 'Product_Size_Detail']}
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
          name={['form', 'Sale_Id']}
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
    </>
  )
}
export default App;