"use client"
import React from 'react';
import { Button, Form, Input, DatePicker, } from 'antd';
import { addPromotion } from '@app/api/getAPI/promotion';
import { DateFormat } from '@components/formats';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
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

const onFinish = (values) => {
    DateFormat(values.form.startDate);
    DateFormat(values.form.endDate);
};

const page = () => {
    const router = useRouter();
    const onFinish = async (form) => {
        const res = await addPromotion(form?.form);
        if (res?.message === 'success') {
            toast.success("Promotion Added.", {
                autoClose: 2000,
            });
        }
        router.push('/backoffice/promotion');
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
                label="Promotion Name" name={['form', 'Promotion_Name']}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Promotion Start Date Date" name={['form', 'Promotion_Start_Date']}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Promotion End Date" name={['form', 'Promotion_End_Date']}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Promotion Discount" name={['form', 'Promotion_Discount']}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input addonAfter="%" />
            </Form.Item>
            <Form.Item
                label="Promotion Price Condition" name={['form', 'Promotion_Price_Condition']}
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
                <div className="flex space-x-4">
                    <Button htmlType="submit" type="primary" danger>Submit</Button>
                    <Button onClick={() => router.push('/backoffice/promotion')} type="primary" danger>Back</Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default page;