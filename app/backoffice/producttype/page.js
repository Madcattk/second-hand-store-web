"use client"
import React from 'react';
import { Space, Table, Button, Image } from 'antd';
const { Column, ColumnGroup } = Table;
import { Row } from 'antd';



const data = [
    {
        key: '1',
        id: 'T001',
        typename: 'Top ',


    },
    {
        key: '2',
        id: 'T002',
        typename: 'Shoes',


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
            <Column title="Type Name" dataIndex="typename" key="typename" />



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
