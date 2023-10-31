"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row, Switch } from 'antd';
import { getAllPromotions, deletePromotionById } from '@app/api/getAPI/promotion';
import { useRouter } from 'next/navigation';
import { DateFormat } from '@components/formats';
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
        const res = await getAllPromotions();
        if (res?.message === 'success') {
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({
                    ...item, Promotion_Start_Date: DateFormat(item.Promotion_Start_Date),
                    Promotion_End_Date: DateFormat(item.Promotion_End_Date),
                    Promotion_Discount: item.Promotion_Discount + "%",
                    Promotion_Price_Condition: item.Promotion_Price_Condition.toFixed(2),
                })
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
                const res = await deletePromotionById(id);
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
                    <div className='font-semibold'>Promotion amount: {data?.length || '-'}</div>
                </Space>
                <Space wrap>
                    <Switch
                        checked={hideID}
                        onChange={() => setHideID(!hideID)}
                        checkedChildren="Hide ID"
                        unCheckedChildren="Hide ID"
                        className='bg-greyV1'
                    />
                    <Button onClick={() => router.push('/backoffice/promotion/addpromotion')} type="primary" danger>
                        Add Promotion
                    </Button>
                </Space>
            </div>

            <Table dataSource={data} scroll={{x: 1500}} rowKey="Promotion_Id" sticky={{offsetHeader:64,}} >
                <Column
                    title="No"
                    key="index"
                    fixed='left'
                    width={60}
                    render={(_, record) => data.indexOf(record) + 1}
                />
                {!hideID && <Column title="ID" dataIndex="Promotion_Id" key="Promotion_Id" fixed='left' width={60} />}
                <Column title="Name" dataIndex="Promotion_Name" key="Promotion_Name" fixed='left' width={150} />
                <Column
                    title="Status"
                    width={120}
                    key="status"
                    render={(_, record) => {
                        const currentDate = new Date();
                        const startDate = new Date(record?.Promotion_Start_Date);
                        const endDate = new Date(record?.Promotion_End_Date);

                        const currentDateWithoutTime = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate()
                        );

                        const startDateWithoutTime = new Date(
                            startDate.getFullYear(),
                            startDate.getMonth(),
                            startDate.getDate()
                        );

                        const endDateWithoutTime = new Date(
                            endDate.getFullYear(),
                            endDate.getMonth(),
                            endDate.getDate()
                        );

                        const isCurrentDateInRange =
                            currentDateWithoutTime >= startDateWithoutTime &&
                            currentDateWithoutTime <= endDateWithoutTime;

                        return (
                            <Space
                                size="middle"
                                className={`${isCurrentDateInRange ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {isCurrentDateInRange ? 'Available' : 'Unavailable'}
                            </Space>
                        );
                    }}
                />
                <Column title="Discount" dataIndex="Promotion_Discount" key="Promotion_Discount" width={120} />
                <Column title="Price Condition" dataIndex="Promotion_Price_Condition" key="Promotion_Price_Condition" width={120} />
                <Column title="Start Date" dataIndex="Promotion_Start_Date" key="Promotion_Start_Date" width={120} />
                <Column title="End Date" dataIndex="Promotion_End_Date" key="Promotion_End_Date" width={120} />
                <Column
                    title="Action"
                    key="action"
                    fixed="right"
                    width={110}
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/promotion/${record.Promotion_Id}`)} danger>Edit</Button>
                            <Button onClick={() => onDelete(record.Promotion_Id)} danger>Delete</Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default page;
