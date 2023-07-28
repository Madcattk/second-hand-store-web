"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { editSizeById, getSizeById } from '@app/api/getAPI/size';
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

const App = () => {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getSizeById(id);
        setData(res?.data?.[0] || {});
        setLoading(false); // Set loading to false after data is fetched
    };

    const onFinish = async (form) => {
        const res = await editSizeById(form);
        if (res?.message === 'success') {
            toast.success("Size Edited.", {
                autoClose: 2000,
            });
            router.push('/backoffice/size');
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
                    initialValues={data}
                >
                    <Form.Item
                        name="Size_Id"
                        label="Size Id"
                        rules={[
                            {
                                type: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Size_Name"
                        label="Size Name"
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default App;