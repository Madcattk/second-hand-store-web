"use client"
import React from 'react';
import { Space, Table, Button, Row} from 'antd';
const { Column} = Table;

const data = [
    {
        key: '1',
        emplyeeId: '1',
        emplyeeFirstName: 'John',
        emplyeelastName: 'Brown',
        emplyeeEmail: 'John@gmail.com',
        emplyeePassword: 'dddd111111',
        emplyeeSex: 'Female',
        emplyeeBirthDate: '2001-11-01',
        emplyeeImage: '',
        emplyeePhone: '0843260583',
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
            <Column title="Employee_Id" dataIndex="emplyeeId" key="emplyeeId" />
            <Column title="Employee_Firstname" dataIndex="emplyeeFirstName" key="emplyeeFirstName" />
            <Column title="Employee_Lastname" dataIndex="emplyeelastName" key="lastName" />
            <Column title="Employee_Email" dataIndex="emplyeeEmail" key="emplyeeEmail" />
            <Column title="Employee_Password" dataIndex="emplyeePassword" key="emplyeePassword" />
            <Column title="Employee_Sex" dataIndex="emplyeeSex" key="emplyeeSex" />
            <Column title="Employee_Birth_Date" dataIndex="emplyeeBirthDate" key="emplyeeBirthDate" />
            <Column title="Employee_Image" dataIndex="emplyeeImage" key="emplyeeImage" />
            <Column title="Employee_Phone" dataIndex="emplyeePhone" key="emplyeePhone" />
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
