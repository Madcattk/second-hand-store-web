"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        product: 'John',
        description: 'Jean Vest ',
        price: 32,
        
    },
    {
        key: '2',
        product: 'Jim',
        description: 'Green',
        price: 42,
        
    },
  
];

const App = () => (
    <>
        <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Product
                </Button>
            </Space>
        </Row>

        <Table dataSource={data}>
            
            <Column title="Product" dataIndex="product" key="product" />
            <Column title="Description" dataIndex="description" key="description" />
            <Column title="Price" dataIndex="price" key="price" />

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
