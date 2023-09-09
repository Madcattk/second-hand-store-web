"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { getAllEmployees } from '@app/api/getAPI/employee';
import { DateFormat } from '@components/formats';
import { Image } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';

const { Column } = Table;
const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [hoveredRowId, setHoveredRowId] = useState(-1);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllEmployees();
        if(res?.message === 'success'){
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
                    <Button className='mr-3 mb-3' onClick={() => router.push('/backoffice/employee/addemployee')} type="primary" danger>
                        Add Employee
                    </Button>
                </Space>
            </Row>
            <Table dataSource={data} rowKey="Employee_Id">
                <Column title="Id" dataIndex="Employee_Id" key="Employee_Id" />
                <Column title="Firstname" dataIndex="Employee_Firstname" key="Employee_Firstname" />
                <Column title="Lastname" dataIndex="Employee_Lastname" key="Employee_Lastname" />
                <Column title="Email" dataIndex="Employee_Email" key="Employee_Email" />
                <Column title="Sex" dataIndex="Employee_Sex" key="Employee_Sex" />
                <Column title="Birth Date" dataIndex="Employee_Birth_Date" key="Employee_Birth_Date" />
                <Column 
                    title="Image"  
                    key="Employee_Image"
                    render={(_, record) => (
                        <div>
                            <Image className='w-[80px] h-[100px]' src={record?.Employee_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
                        </div>
                    )}
                /> 
                <Column title="Phone" dataIndex="Employee_Phone" key="Employee_Phone" /> 
                 {/* <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/employee/${record.Employee_Id}`)} danger>Edit</Button>
                        </Space>
                    )}
                /> */}
                <Column
                    title="Address"
                    dataIndex="Employee_Id"
                    key="click"
                    render={(_, record, index) => (
                        <a onClick={() => setHoveredRowId(index)}>
                            <FontAwesomeIcon icon={faAddressBook} size='2xl'/>        
                        </a>
                    )}
                />
            </Table>
            
            <Modal
                open={hoveredRowId !== -1 ? true : false}
                onCancel={() => setHoveredRowId(-1)}
                footer={null}
                destroyOnClose
            >
                <div className='flex flex-col gap-3 min-h-[40px]'> 
                    {data?.[hoveredRowId]?.Addresses?.map((item, index) => {
                        return<div key={index}>
                                <div> Address {index + 1} :</div>
                                <div className='pl-5'>{item?.Employee_Address}</div>
                            </div>
                    })}
                </div>
            </Modal>
        </>
    );
}

export default App;
