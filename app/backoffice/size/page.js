"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row } from 'antd';
import { getAllSizes } from '@app/api/getAPI/size';
import { useRouter } from 'next/navigation';

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

    return (
        <>
            <Row justify="end">
                <Space wrap>
                    <Button onClick={() => router.push('/backoffice/size/addsize')} type="primary" danger>
                        Add Size
                    </Button>
                </Space>
            </Row>

            <Table dataSource={data} rowKey="Size_Id">
                <Column title="Size Id" dataIndex="Size_Id" key="Size_Id" />
                <Column title="Size Name" dataIndex="Size_Name" key="Size_Name" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button onClick={() => router.push(`/backoffice/size/${record.Size_Id}`)} danger>Edit</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}

export default App;
