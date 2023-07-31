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
    console.log(DateFormat(values.form.startDate));
    console.log(DateFormat(values.form.endDate));

};
const App = () => {
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
                name={['form', 'Promotion_Name']}
                label="Promotion Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Promotion Start Date" name={['form', 'startDate']}>
                <DatePicker />
            </Form.Item>

            <Form.Item label="Promotion End Date" name={['form', 'endDate']}>
                <DatePicker />
            </Form.Item>

            <Form.Item
                name={['form', 'Promotion_Discount']}
                label="Promotion Discount"
                rules={[
                    {
                        type: 'Promotion Discount',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['form', 'Promotion_Price_Condition']}
                label="Promotion PriceCondition"
                rules={[
                    {
                        type: 'Promotion Price Condition',
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