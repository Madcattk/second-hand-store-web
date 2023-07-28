"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        reviewId: '1',
        reviewDetail: '2023-01-02',
        reviewRating: 'Received ',
        productId: 'Received',
       
    },
];

const App = () => (
    <>
        {/* <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Product
                </Button>
            </Space>
        </Row> */}

        <Table dataSource={data}>
            <Column title="Review_Id" dataIndex="reviewId" key="reviewId" />
            <Column title="Review_Detail" dataIndex="reviewDetail" key="reviewDetail" />
            <Column title="Review_Rating" dataIndex="reviewRating" key="reviewRating" />
            <Column title="Product_Id" dataIndex="productId" key="productId" />
            
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
