"use client"
import React from 'react';
import { Space, Table, Button, Row} from 'antd';
const { Column} = Table;

const data = [
    {
        key: '1',
        memberId: '1',
        memberFirstname: 'John',
        memberLastname: 'Brown',
        memberUsername: 'Sunaree',
        memberEmail: 'Sunaree@gmail',
        memberPassword: '123456',
        memberSex: 'Female',
        memberBirthDate: '2001-11-01',
        memberImage: '',
        memberPhone: '0843260583',
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
            <Column title="Member_Id" dataIndex="memberId" key="memberId" />
            <Column title="Member_Firstname" dataIndex="memberFirstname" key="memberFirstname" />
            <Column title="Member_Lastname" dataIndex="memberLastname" key="memberLastname" />
            <Column title="Member_Username" dataIndex="memberUsername" key="memberUsername" />
            <Column title="Member_Email" dataIndex="memberEmail" key="memberEmail" />
            <Column title="Member_Password" dataIndex="memberPassword" key="memberPassword" />
            <Column title="Member_Sex" dataIndex="memberSex" key="memberSex" />
            <Column title="Member_Birth_Date" dataIndex="memberBirthDate" key="memberBirthDate" />
            <Column title="Member_Image" dataIndex="memberImage" key="memberImage" />
            <Column title="Member_Phone" dataIndex="memberPhone" key="memberPhone" />
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
