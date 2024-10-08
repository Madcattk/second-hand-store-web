"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker, message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { editEmployeeById, getEmployeeById } from '@app/api/getAPI/employee';
import { WhiteInputFile } from '@components/inputs';
import { MetaSex } from '@components/Meta';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import dayjs from 'dayjs';

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
  types: {
    email: '${label} (e.g. example@example.com)',
  },
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

  const onChange = (update) => setData({ ...data, ...update })
  const onLoad = async () => {
    const res = await getEmployeeById(id);
    const formateData = {
      ...res?.data?.[0],
      Employee_Birth_Date: dayjs(res?.data?.[0].Employee_Birth_Date)
    }
    setData(formateData);
    setLoading(false); // Set loading to false after data is fetched
  };

  const DATE_FORMAT = "YYYY-MM-DD"
  const onFinish = async ({ form, ...restValues }) => {
    const updatedValues = {
      ...restValues,
      Employee_Image: data?.Employee_Image || null,
      Employee_Birth_Date: dayjs(restValues?.Employee_Birth_Date).format(DATE_FORMAT)
    };

    const res = await editEmployeeById(updatedValues);
    if (res?.message === 'success') {
      toast.success("Employee Edited.", {
        autoClose: 2000,
      });
      router.push('/backoffice/account');
    } else {
      message.error(res?.message);
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
            label="Employee Id" name="Employee_Id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Employee Firstname" name="Employee_Firstname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Lastname" name="Employee_Lastname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Email" name="Employee_Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Password" name="Employee_Password"
            rules={[
              {
                required: true,
              },
              {
                min: 8,
                message: "Employee Password must be minimum 8 characters."
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Employee Sex" name="Employee_Sex"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              {MetaSex.map((item, index) => {
                return <Select.Option key={"Sex" + index} value={item.id}>{item.name}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Employee Birth Date" name="Employee_Birth_Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Employee Phone" name="Employee_Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className='w-full flex justify-center'>
            <WhiteInputFile onChange={(Employee_Image) => onChange({ Employee_Image })} value={data?.Employee_Image || ''} placeholder='Profile Picture' classBox='w-[50%]' />
          </div>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <div className="flex space-x-4">
              <Button htmlType="submit" type="primary" danger>Submit</Button>
              <Button onClick={() => router.push('/backoffice/account')} type="primary" danger>Back</Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default page;