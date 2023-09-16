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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
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
                        text: 'This data has been used already.'
                    })
                }
            }
        })
    };

    return (
        <>
            <Row justify="end">
                <Space wrap>
                    <Button className='mr-3 mb-3' onClick={() => router.push('/backoffice/producttype/addproducttype')} type="primary" danger>
                        Add Product Type
                    </Button>
                </Space>
            </Row>
            <Table dataSource={data} rowKey="Product_Type_Id">
                <Column title="Id" dataIndex="Product_Type_Id" key="Product_Type_Id" />
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
        </>
    );
}

export default App;
