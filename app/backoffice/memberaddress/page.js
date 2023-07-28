"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        memberId: '1',
        memberAddress: '590/66 Asok-Dindaeng Road Bangkok 10310',
        

    },
];

const App = () => (
    <>
        {/* <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Address
                </Button>
            </Space>
        </Row> */}

        <Table dataSource={data}>
            <Column title="Member_Id" dataIndex="memberId" key="memberId" />
            <Column title="Member_Address" dataIndex="memberAddress" key="memberAddress" />

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
