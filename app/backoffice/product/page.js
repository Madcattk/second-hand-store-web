"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { getAllProducts, deleteProductById } from '@app/api/getAPI/product';
import { DateFormat } from '@components/formats';
import { Image } from 'antd'
import Swal from 'sweetalert2';

const { Column } = Table;
const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllProducts({ Limit: false });
        if (res?.message === 'success') {
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({ ...item, Product_Date: DateFormat(item.Product_Date) })
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
                const res = await deleteProductById(id);
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
                    <Button className='mr-3 mb-3' onClick={() => router.push('/backoffice/product/addproduct')} type="primary" danger>
                        Add Product
                    </Button>
                </Space>
            </Row>

            <Table dataSource={data} /*scroll={{x: 250}}*/ rowKey="Product_Id">
                <Column title="Id" dataIndex="Product_Id" key="Product_Id" />
                <Column title="Product Name" dataIndex="Product_Name" key="Product_Name" />
                <Column title="Price" dataIndex="Product_Price" key="Product_Price" />
                <Column title="Description" dataIndex="Product_Description" key="Product_Description" />
                <Column
                    title="Image"
                    key="Product_Image"
                    render={(_, record) => (
                        <div>
                            <Image className='w-[80px] h-[100px]' src={record?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100} />
                        </div>
                    )}
                />
                <Column title="Sex" dataIndex="Product_Sex" key="Product_Sex" />
                <Column title="Date" dataIndex="Product_Date" key="Product_Date" />
                <Column title="Status" dataIndex="Product_Status" key="Product_Status" />
                <Column title="Type Name" dataIndex="Product_Type_Name" key="Product_Type_Name" />
                <Column title="Size Name" dataIndex="Size_Name" key="Size_Name" />
                <Column title="Size Detail" dataIndex="Product_Size_Detail" key="Product_Size_Detail" />
                <Column title="Sale Id" dataIndex="Sale_Id" key="Sale_Id" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            {!record?.Sale_Id && (
                                <>
                                    <Button onClick={() => router.push(`/backoffice/product/${record.Product_Id}`)} danger>Edit</Button>
                                    <Button onClick={() => onDelete(record.Product_Id)} danger>Delete</Button>
                                </>
                            )}
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}

export default App;