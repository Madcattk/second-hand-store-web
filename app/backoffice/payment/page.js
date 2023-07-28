"use client"
import React from 'react';
import { Space, Table, Button, Row} from 'antd';
const { Column} = Table;

const data = [
    {
        key: '1',
        paymentId: '1',
        paymentSlip: '',
        paymentDate: '',
        saleId: '1',
        employeeId: '2',
    
    },
];

const App = () => (
    <>
        {/* <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Member
                </Button>
            </Space>
        </Row> */}

        <Table dataSource={data}>
            <Column title="Payment_Id" dataIndex="paymentId" key="paymentId" />
            <Column title="Payment_Slip" dataIndex="paymentSlip" key="paymentSlip" />
            <Column title="Payment_Date" dataIndex="paymentDate" key="paymentDate" />
            <Column title="Sale_Id" dataIndex="saleId" key="saleId" />
            <Column title="Employee_Id" dataIndex="employeeId" key="employeeId" />
            
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
