"use client"
import React from 'react';
import { Button, Form, Input } from 'antd';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};
const App = () => (
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
            name={['user', 'id']}
            label="Id"
            rules={[
                {
                    required: true,
                },

            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={['user', 'address']}
            label="Address"
            rules={[
                {
                    type: 'Address',
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

);
export default App;