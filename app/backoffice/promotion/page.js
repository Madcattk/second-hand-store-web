"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column} = Table;

const data = [
    {
        key: '1',
        promotionId: '1',
        promotionName: 'Discount 30%',
        promotionStartDate: '2023-01-10 ',
        promotionEndDate: '2023-01-01 ',
        promotionDiscount: '30.00 ',
        promotionPriceCondition: '900.00 ',
    },
];

const App = () => (
    <>
        <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Promotion
                </Button>
            </Space>
        </Row>

        <Table dataSource={data}>

            <Column title="Promotion_Id" dataIndex="promotionId" key="promotionId" />
            <Column title="Promotion_Name" dataIndex="promotionName" key="promotionName" />
            <Column title="Promotion_Start_Date" dataIndex="promotionStartDate" key="promotionStartDate" />
            <Column title="Promotion_End_Date" dataIndex="promotionEndDate" key="promotionEndDate" />
            <Column title="Promotion_Discount" dataIndex="promotionDiscount" key="promotionDiscount" />
            <Column title="Promotion_Price_Condition" dataIndex="promotionPriceCondition" key="promotionPriceCondition" />
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
