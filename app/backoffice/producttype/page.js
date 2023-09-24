"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { getAllProductTypes, deleteProductTypeById } from '@app/api/getAPI/product-type';
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
        const res = await getAllProductTypes();
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
                const res = await deleteProductTypeById(id);
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
                    <div className='font-semibold '>Product Type amount: {data?.length || '-'}</div>
                </Space>
                <Space wrap>
                    <Button className='mr-3 mb-3' onClick={() => router.push('/backoffice/producttype/addproducttype')} type="primary" danger>
                        Add Product Type
                    </Button>
                </Space>
            </div>
            <Table dataSource={data} scroll={{x: 1500}} rowKey="Product_Type_Id" sticky={{offsetHeader:64,}} >
                <Column title="ID" dataIndex="Product_Type_Id" key="Product_Type_Id" />
                <Column title="Name" dataIndex="Product_Type_Name" key="Product_Type_Name" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/producttype/${record.Product_Type_Id}`)} danger>Edit</Button>
                            <Button onClick={() => onDelete(record.Product_Type_Id)} danger>Delete</Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default App;
