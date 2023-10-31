"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { editPromotionById, getPromotionById } from '@app/api/getAPI/promotion';
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

    const onLoad = async () => {
        const res = await getPromotionById(id);
        const formateData = {
            ...res?.data?.[0],
            Promotion_Start_Date: dayjs(res?.data?.[0].Promotion_Start_Date),
            Promotion_End_Date: dayjs(res?.data?.[0].Promotion_End_Date)
        }
        setData(formateData);
        setLoading(false); // Set loading to false after data is fetched
    };

    const DATE_FORMAT = "YYYY-MM-DD"
    const onFinish = async ({ ...restValues }) => {
        const updatedValues = {
            ...restValues,
            Promotion_Start_Date: dayjs(restValues?.Promotion_Start_Date).format(DATE_FORMAT),
            Promotion_End_Date: dayjs(restValues?.Promotion_End_Date).format(DATE_FORMAT)
        };

        const res = await editPromotionById(updatedValues);
        if (res?.message === 'success') {
            toast.success("Promotion Edited.", {
                autoClose: 2000,
            });
            router.push('/backoffice/promotion');
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
                        label="Promotion Id" name="Promotion_Id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Promotion Name" name="Promotion_Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Promotion Start Date" name="Promotion_Start_Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Promotion End Date" name="Promotion_End_Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Promotion Discount" name="Promotion_Discount"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input addonAfter="%" />
                    </Form.Item>
                    <Form.Item
                        label="Promotion Price Condition" name="Promotion_Price_Condition"
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
            )}
        </>
    );
}

export default page;