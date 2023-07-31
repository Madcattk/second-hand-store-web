"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { getAllEmployees } from '@app/api/getAPI/employee';
import { DateFormat } from '@components/formats';
import Image from 'next/image';
const { Column } = Table;


const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllEmployees();
        if(res?.message === 'success'){
            console.log(res.data);
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({ ...item, Employee_Birth_Date: DateFormat(item.Employee_Birth_Date)})
            })
            setData(data || []);
        
        }
        
    };

    return (
        <>
            <Row justify="end">
                <Space wrap>
                    <Button onClick={() => router.push('/backoffice/employee/addemployee')} type="primary" danger>
                        Add Employee
                    </Button>
                </Space>
            </Row>

            <Table dataSource={data} rowKey="Employee_Id">
                <Column title="Employee_Id" dataIndex="Employee_Id" key="Employee_Id" />
                <Column title="Employee_Firstname" dataIndex="Employee_Firstname" key="Employee_Firstname" />
                <Column title="Employee_Lastname" dataIndex="Employee_Lastname" key="Employee_Lastname" />
                <Column title="Employee_Email" dataIndex="Employee_Email" key="Employee_Email" />
                <Column title="Employee_Password" dataIndex="Employee_Password" key="Employee_Password" />
                <Column title="Employee_Sex" dataIndex="Employee_Sex" key="Employee_Sex" />
                <Column title="Employee_Birth_Date" dataIndex="Employee_Birth_Date" key="Employee_Birth_Date" />
                <Column 
                    title="Employee_Image"  
                    key="Employee_Image"
                    render={(_, record) => (
                        <div>
                            <Image className='w-[80px] h-[100px]' src={record?.Employee_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
                        </div>
                    )}
                /> 
                
                <Column title="Employee_Phone" dataIndex="Employee_Phone" key="Employee_Phone" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/employee/${record.Employee_Id}`)} danger>Edit</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}

export default App;
