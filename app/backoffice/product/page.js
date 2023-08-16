"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { getAllProducts } from '@app/api/getAPI/product';
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
        const res = await getAllProducts({Limit: false});
        if(res?.message === 'success'){
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({ ...item, Product_Date: DateFormat(item.Product_Date)})
            })
            setData(data || []);
        
        }
        
    };

    return (
        <>
            <Row justify="end">
                <Space wrap>
                    <Button onClick={() => router.push('/backoffice/product/addproduct')} type="primary" danger>
                        Add Product
                    </Button>
                </Space>
            </Row>

            <Table dataSource={data} scroll={{x: 250}} rowKey="Product_Id">
                <Column title="Product_Id" dataIndex="Product_Id" key="Product_Id" />
                <Column title="Product_Name" dataIndex="Product_Name" key="Product_Name" />
                <Column title="Product_Price" dataIndex="Product_Price" key="Product_Price" />
                <Column title="Product_Description" dataIndex="Product_Description" key="Product_Description" />
                <Column 
                    title="Product_Image"  
                    key="Product_Image"
                    render={(_, record) => (
                        <div>
                            <Image className='w-[80px] h-[100px]' src={record?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
                        </div>
                    )}
                /> 
                <Column title="Product_Sex" dataIndex="Product_Sex" key="Product_Sex" />
                <Column title="Product_Date" dataIndex="Product_Date" key="Product_Date" />
                <Column title="Product_Status" dataIndex="Product_Status" key="Product_Status" />
                <Column title="Product_Type_Name" dataIndex="Product_Type_Name" key="Product_Type_Name" />
                <Column title="Size_Name" dataIndex="Size_Name" key="Size_Name" />
                <Column title="Product_Size_Detail" dataIndex="Product_Size_Detail" key="Product_Size_Detail" />
                <Column title="Sale_Id" dataIndex="Sale_Id" key="Sale_Id" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/product/${record.Product_Id}`)} danger>Edit</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}

export default App;