"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        saleId: '1',
        saleDate: '2023-01-02',
        saleStatus: 'Received ',
        saleTrackingNumber: 'Received',
        memberId: '1',
        saleTotalPrice: '900.00',
        promotionId: '1',
        deliveryAddress: 'Talad Bangkaen Laksi BKK 10210',
        discountedTotalPrice: '630',
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
            <Column title="Sale_Id" dataIndex="saleId" key="saleId" />
            <Column title="Sale_Date" dataIndex="saleDate" key="saleDate" />
            <Column title="Sale_Status" dataIndex="saleStatus" key="saleStatus" />
            <Column title="Sale_Tracking_Number" dataIndex="saleTrackingNumber" key="saleTrackingNumber" />
            <Column title="Member_Id" dataIndex="memberId" key="memberId" />
            <Column title="Sale_Total_Price" dataIndex="saleTotalPrice" key="saleTotalPrice" />
            <Column title="Promotion_Id" dataIndex="promotionId" key="promotionId" />
            <Column title="Delivery_Address" dataIndex="deliveryAddress" key="deliveryAddress" />
            <Column title="Discounted_Total_Price" dataIndex="discountedTotalPrice" key="discountedTotalPrice" />
            



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
