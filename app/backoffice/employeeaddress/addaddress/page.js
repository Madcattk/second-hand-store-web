"use client"
import React from 'react';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { addEmployee } from '@app/api/getAPI/employee';
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
    const router = useRouter();
  
    const onFinish = async (form) => {
      const res = await addEmployee(form?.form);
      if (res?.message === 'success') {
        toast.success("Address Added.", {
          autoClose: 2000,
        });
      }
      router.push('/backoffice/employeeaddress');
    };
    return (
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
            name={['form', 'Employee_Address']}
            label="Employee Address"
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
  )
}
export default App;