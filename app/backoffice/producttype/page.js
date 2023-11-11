"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row, Switch } from 'antd';
import { getAllProductTypes, deleteProductTypeById } from '@app/api/getAPI/product-type';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const { Column } = Table;
const page = () => {
    const router = useRouter();
    const [hideID, setHideID] = useState(true);
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
                    <div className='font-semibold'>Product Type amount: {data?.length || '-'}</div>
                </Space>
                <Space wrap>
                    <Switch
                        checked={hideID}
                        onChange={() => setHideID(!hideID)}
                        checkedChildren="Hide ID"
                        unCheckedChildren="Hide ID"
                        className='bg-greyV1'
                    />
                    <Button onClick={() => router.push('/backoffice/producttype/addproducttype')} type="primary" danger>
                        Add Product Type
                    </Button>
                </Space>
            </div>
            <Table dataSource={data} scroll={{x: 1500}} rowKey="Product_Type_Id" sticky={{offsetHeader:64,}} >
                <Column
                    title="No"
                    fixed='left'
                    width={60}
                    render={(_, record) => data.indexOf(record) + 1}
                />
                {!hideID && <Column title="ID" dataIndex="Product_Type_Id"/>}
                <Column title="Name" dataIndex="Product_Type_Name"/>
                <Column
                    title="Action"
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

export default page;
