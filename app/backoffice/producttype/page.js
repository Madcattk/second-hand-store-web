"use client"
import React from 'react';
import { Space, Table, Button,Row  } from 'antd';
const { Column} = Table;

const data = [
    {
        key: '1',
        productTypeId: '1',
        productTypeName: 'Top ',

    },
    {
        key: '2',
        productTypeId: '2',
        productTypeName: 'Shoes',
    },

];

const App = () => (
    <>
        <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Product Type
                </Button>
            </Space>
        </Row>
        <Table dataSource={data}>
            <Column title="Product_Type_Id" dataIndex="productTypeId" key="productTypeId" />
            <Column title="Product_Type__Name" dataIndex="productTypeName" key="productTypeName" />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        {/* <a>Invite {record.lastName}</a> */}
                        <a>Edit</a>
                        <a>Delete</a>
                    </Space>
                )}
            />

        </Table>
    </>
);
export default App;
