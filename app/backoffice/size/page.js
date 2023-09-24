"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row, message, Switch } from 'antd';
import { deleteSizeById, getAllSizes } from '@app/api/getAPI/size';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const { Column } = Table;
const App = () => {
    const router = useRouter();
    const [hideID, setHideID] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllSizes();
        setData(res?.data || []);
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
                const res = await deleteSizeById(id);
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
                    <div className='font-semibold'>Size amount: {data?.length || '-'}</div>
                </Space>
                <Space wrap>
                    <Switch
                        checked={hideID}
                        onChange={() => setHideID(!hideID)}
                        checkedChildren="Hide ID"
                        unCheckedChildren="Hide ID"
                        className='bg-greyV1'
                    />
                    <Button onClick={() => router.push('/backoffice/size/addsize')} type="primary" danger>
                        Add Size
                    </Button>
                </Space>
            </div>
            <Table dataSource={data} scroll={{x: 1500}} rowKey="Size_Id" sticky={{offsetHeader:64,}} >
                <Column
                    title="No"
                    key="index"
                    fixed='left'
                    width={60}
                    render={(_, record) => data.indexOf(record) + 1}
                />
                {!hideID && <Column title="ID" dataIndex="Size_Id" key="Size_Id" />}
                <Column title="Name" dataIndex="Size_Name" key="Size_Name" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/size/${record.Size_Id}`)} danger>Edit</Button>
                            <Button onClick={() => onDelete(record.Size_Id)} danger>Delete</Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default App;
