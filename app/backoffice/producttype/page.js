"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { getAllProductTypes } from '@app/api/getAPI/product-type';
import { useRouter } from 'next/navigation';

const { Column } = Table;
const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllProductTypes();
        setData(res?.data || []);
    };

    return (
        <>
            <Row justify="end">
                <Space wrap>
                    <Button onClick={() => router.push('/backoffice/producttype/addproducttype')} type="primary" danger>
                        Add Product Type
                    </Button>
                </Space>
            </Row>
            <Table dataSource={data} rowKey="Product_Type_Id">
                <Column title="Product Type Id" dataIndex="Product_Type_Id" key="Product_Type_Id" />
                <Column title="Product Type Name" dataIndex="Product_Type_Name" key="Product_Type_Name" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/producttype/${record.Product_Type_Id}`)} danger>Edit</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}

export default App;
