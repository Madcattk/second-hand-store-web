"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row, Switch } from 'antd';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { deleteEmployeeById, getAllEmployees } from '@app/api/getAPI/employee';
import { DateFormat } from '@components/formats';
import { Image } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const { Column } = Table;
const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [hideID, setHideID] = useState(true);
    const [hoveredRowId, setHoveredRowId] = useState(-1);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllEmployees();
        if (res?.message === 'success') {
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({ ...item, Employee_Birth_Date: DateFormat(item.Employee_Birth_Date) })
            })
            setData(data || []);
        }
    };

    const onDelete = async (id) => {
        Swal.fire({
            title: 'Do you want to delete this?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2F58CD',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteEmployeeById(id);
                onLoad()
                if (res?.message !== 'success') {
                    Swal.fire({
                        icon: 'error',
                        title: `Couldn't delete!`,
                        text: 'This data has been used already.',
                        confirmButtonColor: '#2F58CD'
                    })
                }
            }
        })
    };

    return (
        <div className='relative w-full'>
            <div className='w-full sticky top-0 z-50 h-16 py-1 px-3 bg-white flex justify-between items-center'>
                <Space wrap>
                    <div className='font-semibold'>Employee amount: {data?.length || '-'}</div>
                </Space>
                <Space wrap> 
                    <Switch
                        checked={hideID}
                        onChange={() => setHideID(!hideID)}
                        checkedChildren="Hide ID"
                        unCheckedChildren="Hide ID"
                        className='bg-greyV1'
                    />
                    <Button onClick={() => router.push('/backoffice/employee/addemployee')} type="primary" danger>
                        Add Employee
                    </Button>
                </Space>
            </div>
            <Table dataSource={data} scroll={{x: 1500}} rowKey="Employee_Id" sticky={{offsetHeader:64,}} >
                <Column
                    title="No"
                    key="index"
                    fixed='left'
                    width={60}
                    render={(_, record) => data.indexOf(record) + 1}
                />
                <Column
                    title="Image"
                    key="Employee_Image"
                    fixed='left'
                    width={100} 
                    render={(_, record) => (
                        <div>
                            <Image className='w-[80px] h-[100px]' src={record?.Employee_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100} />
                        </div>
                    )}
                />
                {!hideID && <Column title="ID" dataIndex="Employee_Id" key="Employee_Id" width={60} />}
                <Column title="Firstname" dataIndex="Employee_Firstname" key="Employee_Firstname" width={120} />
                <Column title="Lastname" dataIndex="Employee_Lastname" key="Employee_Lastname" width={120} />
                <Column title="Email" dataIndex="Employee_Email" key="Employee_Email" width={200} />
                <Column title="Sex" dataIndex="Employee_Sex" key="Employee_Sex" width={120} />
                <Column title="Birth Date" dataIndex="Employee_Birth_Date" key="Employee_Birth_Date" width={120} />
                <Column title="Phone" dataIndex="Employee_Phone" key="Employee_Phone" width={120} />
                <Column
                    title="Address"
                    dataIndex="Employee_Id"
                    width={120}
                    key="click"
                    render={(_, record, index) => (
                        <Space size="middle">
                            <a onClick={() => setHoveredRowId(index)}>
                                <FontAwesomeIcon icon={faHouse} size='2xl' />
                            </a>
                        </Space>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    fixed="right"
                    width={85}
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => onDelete(record.Employee_Id)} danger>Delete</Button>
                        </Space>
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
                        return <div key={index}>
                            <div> Address {index + 1} :</div>
                            <div className='pl-5'>{item?.Employee_Address}</div>
                        </div>
                    })}
                </div>
            </Modal>
        </div>
    );
}

export default App;
