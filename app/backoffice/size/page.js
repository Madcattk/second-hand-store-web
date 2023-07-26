"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;


const data = [
    {
        key: '1',
        id: 'T001',
        sizename: 'S',
    },
    {
        key: '2',
        id: 'T002',
        sizename: 'M',
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
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="Size Name" dataIndex="sizename" key="sizename" />
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
