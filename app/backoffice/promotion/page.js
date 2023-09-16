"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { getAllPromotions, deletePromotionById } from '@app/api/getAPI/promotion';
import { useRouter } from 'next/navigation';
import { DateFormat } from '@components/formats';
import Swal from 'sweetalert2';

const { Column } = Table;
const App = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const res = await getAllPromotions();
        if (res?.message === 'success') {
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({
                    ...item, Promotion_Start_Date: DateFormat(item.Promotion_Start_Date),
                    Promotion_End_Date: DateFormat(item.Promotion_End_Date)
                })
            })
            setData(data || []);
        }
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deletePromotionById(id);
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
                    <Button className='mr-3 mb-3' onClick={() => router.push('/backoffice/promotion/addpromotion')} type="primary" danger>
                        Add Promotion
                    </Button>
                </Space>
            </Row>

            <Table dataSource={data} rowKey="Promotion_Id">
                <Column title="Id" dataIndex="Promotion_Id" key="Promotion_Id" />
                <Column title="Name" dataIndex="Promotion_Name" key="Promotion_Name" />
                <Column title="Start Date" dataIndex="Promotion_Start_Date" key="Promotion_Start_Date" />
                <Column title="End Date" dataIndex="Promotion_End_Date" key="Promotion_End_Date" />
                <Column title="Discount" dataIndex="Promotion_Discount" key="Promotion_Discount" />
                <Column title="Price Condition" dataIndex="Promotion_Price_Condition" key="Promotion_Price_Condition" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/promotion/${record.Promotion_Id}`)} danger>Edit</Button>
                            <Button onClick={() => onDelete(record.Promotion_Id)} danger>Delete</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}

export default App;
