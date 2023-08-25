"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { WhiteInputFile } from '@components/inputs';
import { MetaProductSex, MetaProductStatus, MetaSex } from '@components/Meta';
import { addProduct } from '@app/api/getAPI/product';
import { useRouter } from 'next/navigation';
import { DateFormat } from '@components/formats';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { getAllSizes } from '@app/api/getAPI/size';
import { getAllProductTypes } from '@app/api/getAPI/product-type';

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
  const [image, setImage] = useState(null);
  const [meta, setMeta] = useState({})
  const onChange = (update) => setImage(update)

  useEffect(() => {
    onload()
  }, [])

  const onload = async () => {
    const resSize = await getAllSizes();
    const sizes = resSize?.data?.map((item, index) => {
      return {
        id: item?.Size_Id,
        name: item?.Size_Name
      }
    })
    const resProductType = await getAllProductTypes();
    const productTypes = resProductType?.data?.map((item, index) => {
      return {
        id: item?.Product_Type_Id,
        name: item?.Product_Type_Name
      }
    })
    setMeta({
      Sizes: sizes,
      Product_Types: productTypes
    })
  }

  const onFinish = async (values) => {
    values.form = {
      ...values.form,
      Product_Image: image?.image || null,
      Product_Date: DateFormat(values.form.Product_Date) || null,
      Product_Description: values.form.Product_Description || null,
      Size_Id: values.form.Size_Id || null,
      Product_Size_Detail: values.form.Product_Size_Detail || null,
    }

    const res = await addProduct(values.form);
    if (res?.message === 'success') {
      toast.success("Product Added.", {
        autoClose: 2000,

      });
      router.push('/backoffice/product');
    }
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
        initialValues={{
          form: {
            Product_Status: MetaProductStatus[0].id,
            Sale_Id: null,
          }
        }}
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
              type: 'Product_Description',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Product Sex" name={['form', 'Product_Sex']} rules={[
          {
            required: true,
          },
        ]}
        >
          <Select>
            {MetaProductSex.map((item, index) => {
              return <Select.Option key={"Sex" + index} value={item.id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Product Date" name={['form', 'Product_Date']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Product Status" name={['form', 'Product_Status']} rules={[
          {
            required: true,
          },
        ]}
        >
          <Select>
            {MetaProductStatus.map((item, index) => {
              return <Select.Option key={"Status" + index} value={item.id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Product Type" name={['form', 'Product_Type_Id']} rules={[
          {
            required: true,
          },
        ]}
        >
          <Select>
            {meta?.Product_Types?.map((item, index) => {
              return <Select.Option key={"Product-Type" + index} value={item.id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Size" name={['form', 'Size_Id']}
        >
          <Select>
            {meta?.Sizes?.map((item, index) => {
              return <Select.Option key={"Product-Type" + index} value={item.id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name={['form', 'Product_Size_Detail']}
          label="Product Size Detail"
          rules={[
            {
              type: 'Product_Size_Detail',
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
              type: 'Sale_Id',
            },
          ]}
        >
          <Input disabled />
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