"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        employeeId: '1',
        employeeAddress: '590/66 Asok-Dindaeng Road Bangkok 10310',
        

    },
];

const App = () => (
    <>
        <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Address
                </Button>
            </Space>
        </Row>

        <Table dataSource={data}>
            <Column title="Employee_Id" dataIndex="employeeId" key="employeeId" />
            <Column title="Employee_Address" dataIndex="employeeAddress" key="employeeAddress" />

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
