"use client"
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Row, Tooltip, Switch } from 'antd';
import { getAllProducts, deleteProductById, getProductsBySearch } from '@app/api/getAPI/product';
import { DateFormat } from '@components/formats';
import { Image } from 'antd'
import Swal from 'sweetalert2';
import { MetaProductSex, MetaProductStatus } from '@components/Meta';
import { Col, Form, Input, Select, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getAllProductTypes } from '@app/api/getAPI/product-type';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
const { Option } = Select;
const { Column } = Table;

const AdvancedSearchForm = ({data, setData, router, expand, setExpand, onLoadOldData, hideID, setHideID}) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [meta, setMeta] = useState({})
    const formStyle = {
        maxWidth: 'none',
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async() => {
        const resProductType = await getAllProductTypes();
        const productTypes = resProductType?.data?.map((item, index) => {
            return {
                id: item?.Product_Type_Id,
                name: item?.Product_Type_Name
            }
        })
        setMeta({
            Product_Types: productTypes
        })
    }

    const getFields = () => {
        const count = expand ? 3 : 0;
        const children = [];
        for (let i = 0; i < count; i++) {
        children.push(
            <Col span={8} key={i}>
            {i % 3 !== 2 ? (
                <Form.Item
                    name={`${i === 0 ? 'Product_Type' : 'Product_Sex'}`}
                    label={`${i === 0 ? 'Product Type' : 'Product Sex'}`}
                >
                    <Select 
                        onChange={() => onChange(`${i === 0 ? 'Product_Type' : 'Product_Sex'}`)}
                    >
                        {i === 0 ?
                            meta?.Product_Types?.map((item, index) => {
                                return <Select.Option key={"Product-Type" + index} value={item.id}>{item.name}</Select.Option>
                            })
                        :
                            MetaProductSex.map((item, index) => {
                                return <Select.Option key={"Sex" + index} value={item.id}>{item.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
            ) : (
                <Form.Item
                    name={`Search_Input`}
                    label={`Search Input`}
                    onChange={() => onChange('Search_Input')}
                >
                    <Input placeholder="Product Name" />
                </Form.Item>
            )}
            </Col>,
        );
        }
        return children;
    };

    const onChange = (fieldName) => {
        if(fieldName === "Product_Type") {
            form.resetFields(["Search_Input"])
        } else if (fieldName === "Product_Sex") {
            form.resetFields(["Search_Input"])
        }else if (fieldName === "Search_Input") {
            form.resetFields(["Product_Type", "Product_Sex"])
        }
    };

    const onFinish = async(values) => {
        if(values?.Search_Input === undefined && values?.Product_Type === undefined && values?.Product_Sex === undefined) {
            onLoadOldData()
            return
        }
        const res = await getProductsBySearch({
            'searchInput': values?.Search_Input,
            'searchType': values?.Product_Type,
            'searchSex': values?.Product_Sex,
        });
        if(res?.message === 'success' && res?.data){
            let data = [];
            res?.data?.forEach((item, index) => {
                data.push({ ...item, Product_Date: DateFormat(item.Product_Date), Product_Price: item.Product_Price.toFixed(2) })
            })
            setData(data || []);
        }
    };
    return (
        <Form className='sticky top-0 z-50 bg-white' form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>{getFields()}</Row>
            <Row justify="space-between">
                <Space wrap>
                    <div className='font-semibold'>Product amount: {data?.length || '-'}</div>
                </Space>

                <Space wrap>
                    <Switch
                        checked={hideID}
                        onChange={() => setHideID(!hideID)}
                        checkedChildren="Hide ID"
                        unCheckedChildren="Hide ID"
                        className='bg-greyV1'
                    />
                    <Button onClick={() => router.push('/backoffice/product/addproduct')} type="primary" danger htmlType='button'>
                            Add Product
                    </Button>
                    {expand &&
                    <>
                        <Button type="primary" danger htmlType="submit">
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                onLoadOldData();
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                    </>
                    }
                    <FontAwesomeIcon onClick={() => {
                        setExpand(!expand);
                    }} icon={faCircleChevronUp} rotation={expand ? 180 : 0} className='text-gray cursor-pointer' size='xl' />
                </Space>
            </Row>
        </Form>
    );
};

const App = () => {
    const { token } = theme.useToken();
    const [hideID, setHideID] = useState(true);
    const [expand, setExpand] = useState(true);
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
        <div className='w-full ralative'>
            <AdvancedSearchForm data={data} setData={setData} router={router} expand={expand} setExpand={setExpand} onLoadOldData={onLoad} hideID={hideID} setHideID={setHideID}/>
            <Table dataSource={data} scroll={{x: 1500}} rowKey="Product_Id" sticky={{offsetHeader: expand ? 135 : 80,}} >
                <Column
                    title="No"
                    key="index"
                    fixed='left'
                    width={60}
                    render={(_, record) => data.indexOf(record) + 1}
                />
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
                {!hideID && <Column title="ID" dataIndex="Product_Id" key="Product_Id" width={60} />}
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
        </div>
    );
}

export default App;