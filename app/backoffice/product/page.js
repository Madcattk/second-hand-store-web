"use client"
import React from 'react';
import { Space, Table, Button, Row } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        productId: '1',
        productName: 'Artzia Women’s White Crop-top',
        productPrice: '150.00 ',
        productDescription: 'Aritzia sculpt knit square neck in',
        productImage: '',
        productSex: 'Female',
        productDate: '2023-01-23',
        productStatus: 'Unavailable',
        productTypeId: '1',
        sizeId: '1',
        productSizeDetail: 'waist31',
        saleId: '3',

    },
];

const App = () => (
    <>
        <Row justify="end">
            <Space wrap>
                <Button type="primary" danger>
                    Add Product
                </Button>
            </Space>
        </Row>

        <Table dataSource={data}>
            <Column title="Product_Id" dataIndex="productId" key="productId" />
            <Column title="Product_Name" dataIndex="productName" key="productName" />
            <Column title="Product_Price" dataIndex="productPrice" key="productPrice" />
            <Column title="Product_Description" dataIndex="productDescription" key="productDescription" />
            <Column title="Product_Image" dataIndex="productImage" key="productImage" />
            <Column title="Product_Sex" dataIndex="productSex" key="productSex" />
            <Column title="Product_Date" dataIndex="productDate" key="productDate" />
            <Column title="Product_Status" dataIndex="productStatus" key="productStatus" />
            <Column title="Product_Type_Id" dataIndex="productTypeId" key="productTypeId" />
            <Column title="Size_Id" dataIndex="sizeId" key="sizeId" />
            <Column title="Product_Size_Detail" dataIndex="productSizeDetail" key="productSizeDetail" />
            <Column title="Sale_Id" dataIndex="saleId" key="saleId" />



            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        {/* <a>Invite {record.lastName}</a> */}
                        <a>Edit</a>
                        <a>Delete</a>
                    </Space>
                )}
            />

        </Table>
    </>
);
export default App;
