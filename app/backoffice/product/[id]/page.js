"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { DateFormat } from '@components/formats';
import { useParams, useRouter } from 'next/navigation';
import { editProductById, getProductById } from '@app/api/getAPI/product';
import { MetaProductSex, MetaProductStatus, MetaSex } from '@components/Meta';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { WhiteInputFile } from '@components/inputs';
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
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    onLoad();
  }, []);

  const onChange = (update) => setData({ ...data, ...update })
  const onLoad = async () => {
    const res = await getProductById(id);
    res.data[0].Product_Date = DateFormat(res.data[0].Product_Date);
    setData(res?.data?.[0] || {});
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
    setLoading(false); // Set loading to false after data is fetched
  };

  const onFinish = async ({ form, ...restValues }) => {
    const updatedValues = {
      ...restValues,
      Product_Image: data?.Product_Image || null,
      Product_Date: DateFormat(form?.Product_Date)
    };

    const res = await editProductById(updatedValues);
    if (res?.message === 'success') {
      toast.success("Product Edited.", {
        autoClose: 2000,

      });
      router.push('/backoffice/product');
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
            name="Product_Id"
            label="Product Id">
            <Input disabled />
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
            name="Product_Description"
            label="Product Description">
            <Input />
          </Form.Item>
          <Form.Item label="Product Sex" name={'Product_Sex'}
            rules={[
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
          <Form.Item label="Product Status" name={'Product_Status'}
            rules={[
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
          <Form.Item label="Product Type" name={'Product_Type_Id'} 
          rules={[
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
          <Form.Item label="Size" name={'Size_Id'}>
            <Select>
              {meta?.Sizes?.map((item, index) => {
                return <Select.Option key={"Product-Type" + index} value={item.id}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="Product_Size_Detail"
            label="Product Size Detail">
            <Input />
          </Form.Item>
          <Form.Item
            name="Sale_Id"
            label="Sale_Id">
            <Input disabled />
          </Form.Item>
          <div className='w-full flex justify-center'>
            <WhiteInputFile onChange={(Product_Image) => onChange({ Product_Image })} value={data?.Product_Image || ''} placeholder='Profile Picture' classBox='w-[50%]' />
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