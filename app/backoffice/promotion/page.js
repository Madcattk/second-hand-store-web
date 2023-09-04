"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { getAllPromotions } from '@app/api/getAPI/promotion';
import { useRouter } from 'next/navigation';
import { DateFormat } from '@components/formats';

const { Column} = Table;
const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllPromotions();
        if(res?.message === 'success'){
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({ ...item, Promotion_Start_Date: DateFormat(item.Promotion_Start_Date),
                    Promotion_End_Date: DateFormat(item.Promotion_End_Date)})
            })
            setData(data || []);
        }
        
    };

    return (
    <>
        <Row justify="end">
            <Space wrap>
            <Button onClick={()=> router.push('/backoffice/promotion/addpromotion')} type="primary" danger>
                Add Promotion
                </Button>
            </Space>
        </Row>

        <Table dataSource={data} rowKey="Promotion_Id">
            <Column title="Promotion Id" dataIndex="Promotion_Id" key="Promotion_Id" />
            <Column title="Promotion Name" dataIndex="Promotion_Name" key="Promotion_Name" />
            <Column title="Promotion Start Date" dataIndex="Promotion_Start_Date" key="Promotion_Start_Date" />
            <Column title="Promotion End Date" dataIndex="Promotion_End_Date" key="Promotion_End_Date" />
            <Column title="Promotion Discount" dataIndex="Promotion_Discount" key="Promotion_Discount" />
            <Column title="Promotion Price Condition" dataIndex="Promotion_Price_Condition" key="Promotion_Price_Condition" />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <Button onClick={()=> router.push(`/backoffice/promotion/${record.Promotion_Id}`)} danger>Edit</Button> 

                    </Space>
                )}
                />
            </Table>
            </>
        );
    }
    
export default App;
    