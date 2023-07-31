"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { useParams, useRouter } from 'next/navigation';
import { editEmployeeById, getEmployeeById } from '@app/api/getAPI/employee';
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
  types: {
    email: '${label} is not a valid email!',
  },
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
    let data = {...values, Employee_Image: image?.image || null}
    console.log(data);
    
  };

  const onLoad = async () => {
    const res = await getEmployeeById(id);
    setData(res?.data?.[0] || {});
    setLoading(false); // Set loading to false after data is fetched
  };

  // const onFinish = async (form) => {
  //   const res = await editEmployeeById(form);
  //   if (res?.message === 'success') {
  //     toast.success("Employee Edited.", {
  //       autoClose: 2000,
  //     });
  //     router.push('/backoffice/employee');
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
            name="Employee_Id"
            label="Employee Id"
            rules={[
              {
                type: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Employee_Firstname"
            label="Employee Firstname	"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Employee_Lastname"
            label="Employee Lastname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Employee_Email"
            label="Employee Email"
            rules={[
              {
                type: 'Employee Email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Employee_Password"
            label="Employee Password"
            rules={[
              {
                type: 'Employee Password',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Employee Sex">
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Employee Birth Date">
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="Employee_Phone"
            label="Employee Phone"
            rules={[
              {
                type: 'Employee Phone',
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