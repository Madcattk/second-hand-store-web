"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { getAllProducts, deleteProductById } from '@app/api/getAPI/product';
import { DateFormat } from '@components/formats';
import { Image } from 'antd'
import Swal from 'sweetalert2';
import { MetaProductStatus } from '@components/Meta';

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
                data.push({ ...item, Product_Date: DateFormat(item.Product_Date), Product_Price: item.Product_Price.toFixed(2) })
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
            <div className='w-full sticky top-0 z-50 h-16 py-1 px-3 bg-white flex justify-between items-center'>
                <Space wrap>
                    <div className='font-semibold'>Product amount: {data?.length || '-'}</div>
                </Space>
                <Space wrap>
                    <Button onClick={() => router.push('/backoffice/product/addproduct')} type="primary" danger>
                        Add Product
                    </Button>
                </Space>
            </div>

            <Table dataSource={data} scroll={{x: 1500}} rowKey="Product_Id" sticky={{offsetHeader: 64,}}>
                <Column title="ID" dataIndex="Product_Id" key="Product_Id" fixed='left' width={60} />
                <Column
                    title="Image"
                    key="Product_Image"
                    fixed='left'
                    width={120}
                    render={(_, record) => (
                        <div>
                            <Image className='w-[80px] h-[100px]' src={record?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100} />
                        </div>
                    )}
                />
                <Column title="Product Name" dataIndex="Product_Name" key="Product_Name" width={150} />
                <Column title="Price" dataIndex="Product_Price" key="Product_Price" width={120}/>
                <Column
                    title="Status"
                    key="Product_Status"
                    width={120}
                    render={(_, record) => (
                        <Space 
                            size="middle" 
                            className={`${record?.Product_Status === MetaProductStatus?.[0]?.id ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {record?.Product_Status}
                        </Space>
                    )}
                />
                <Column title="Description" dataIndex="Product_Description" key="Product_Description" width={500} />
                <Column title="Sex" dataIndex="Product_Sex" key="Product_Sex" width={120} />
                <Column title="Type Name" dataIndex="Product_Type_Name" key="Product_Type_Name" width={120} />
                <Column title="Size Name" dataIndex="Size_Name" key="Size_Name" width={120} />
                <Column title="Size Detail" dataIndex="Product_Size_Detail" key="Product_Size_Detail" width={150} />
                <Column title="Date" dataIndex="Product_Date" key="Product_Date" width={120} />
                <Column title="Sale Id" dataIndex="Sale_Id" key="Sale_Id" width={100} />
                <Column
                    title="Action"
                    key="action"
                    fixed="right"
                    width={180}
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