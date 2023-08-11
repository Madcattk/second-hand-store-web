"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { getAllEmployees } from '@app/api/getAPI/employee';

const { Column } = Table;

const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllEmployees();
        setData(res?.data || []);
    };
    return (
    <>
        <Row justify="end">
            <Space wrap>
            <Button onClick={()=> router.push('/backoffice/employeeaddress/addaddress')} type="primary" danger>
                Add Employee Address
            </Button>
            </Space>
        </Row>
        <Table dataSource={data} rowKey="Employee_Id">
            <Column title="Employee_Id" dataIndex="Employee_Id" key="Employee_Id" />
            <Column title="Employee_Address" dataIndex="Employee_Address" key="Employee_Address" />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                       <Button onClick={()=> router.push(`/backoffice/employeeaddress/${record.Employee_Id}`)} danger>Edit</Button> 
                </Space>
            )}
            />
        </Table>
        </>
    );
}

export default App;
