"use client"
import React, { useState } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { WhiteInputFile } from '@components/inputs';
import { useRouter } from 'next/navigation';
import { addEmployee } from '@app/api/getAPI/employee';
import { DateFormat } from '@components/formats';
import { MetaSex } from '@components/Meta';
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
  types: {
    email: '${label} is not a valid email!',
  },
};
/* eslint-enable no-template-curly-in-string */

const App = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const onChange = (update) => setImage(update)
  const onFinish = async (values) => {
    values.form = { ...values.form, Employee_Image: image?.image || null , Employee_Birth_Date: DateFormat( values?.form?.Employee_Birth_Date )}
    const res = await addEmployee(values.form);
    if (res?.message === 'success') {
      toast.success("Employee Added.", {
        autoClose: 2000,
      });
      router.push('/backoffice/employee');
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
      >
        <Form.Item
          name={['form', 'Employee_Firstname']}
          label="Employee Firstname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['form', 'Employee_Lastname']}
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
          name={['form', 'Employee_Email']}
          label="Employee Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['form', 'Employee_Password']}
          label="Employee Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Employee Sex" name={['form', 'Employee_Sex']}
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
          <Form.Item label="Employee Birth Date" name={['form', 'Employee_Birth_Date']}
          rules={[
            {
              required: true,
            },
          ]}
          >
            <DatePicker />
          </Form.Item>
        <Form.Item
          name={['form', 'Employee_Phone']}
          label="Employee Phone"
          rules={[
            {
              required: true,
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