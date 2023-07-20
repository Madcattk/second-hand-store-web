"use client"
import React from 'react';
import { Space, Table, Button, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
import {Row } from 'antd';



const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        firstName: 'Joe',
        lastName: 'Black',
        email: 'Pank',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
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
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Password" dataIndex="password" key="password" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Sex" dataIndex="sex" key="Sex" />
            <Column title="BirthDate" dataIndex="birthDate" key="birthDate" />
            <Column title="Image" dataIndex="image" key="image" />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <a>Invite {record.lastName}</a>
                        <a>Edit</a>
                        <a>Delete</a>
                    </Space>
                )}
            />

        </Table>
    </>
);
export default App;
