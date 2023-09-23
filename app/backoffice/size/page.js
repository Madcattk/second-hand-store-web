"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row, message } from 'antd';
import { deleteSizeById, getAllSizes } from '@app/api/getAPI/size';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const { Column } = Table;
const App = () => {
    const router = useRouter();
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
        }).then( async (result) => {
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
        <>
            <Row justify="end">
                <Space wrap>
                    <Button className='mr-3 mb-3' onClick={() => router.push('/backoffice/size/addsize')} type="primary" danger>
                        Add Size
                    </Button>
                </Space>
            </Row>

            <Table dataSource={data} rowKey="Size_Id">
                <Column title="ID" dataIndex="Size_Id" key="Size_Id" />
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
        </>
    );
}

export default App;
