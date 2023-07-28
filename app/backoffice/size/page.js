"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;


const data = [
    {
        key: '1',
        sizeId: '1',
        sizeName: 'S',
    },
    {
        key: '2',
        sizeId: '2',
        sizeName: 'M',
    },

];

const App = () => (
    <>
        <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Size
                </Button>
            </Space>
        </Row>

        <Table dataSource={data}>
            <Column title="Size_Id" dataIndex="sizeId" key="sizeId" />
            <Column title="Size_Name" dataIndex="sizeName" key="sizeName" />
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
