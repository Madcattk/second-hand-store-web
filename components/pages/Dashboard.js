"use client"
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getBestSellerProductReport } from '@app/api/getAPI/sale';
import { DateFormat } from '@components/formats';
import { InputDate } from '@components/inputs';

export const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [form, setForm] = useState([])
    const [date, setDate] = useState({
        Start_Date: DateFormat(getStartOfYear()),
        End_Date: DateFormat(Date.now())
    });

    // Function to get the first day of the current year
    function getStartOfYear() {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1); // January is month 0
        return startOfYear;
    }

    const [BSPData, setBSPData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Best Seller Product Report',
                data: [],
                backgroundColor: []
            },
        ],
    })
    const onChange = (update) => setDate({ ...date, ...update })
    let total = 0;

    useEffect(() => {
        onLoad()
    },[date])

    const onLoad = async () => {
        total = 0;
        const resBestSellerProduct = await getBestSellerProductReport({
            "Start_Date": DateFormat(date?.Start_Date),
            "End_Date": DateFormat(date?.End_Date)
        }) 
        
        if(resBestSellerProduct.message == 'success'){
            setForm(resBestSellerProduct?.data || [])
            let labels = [];
            let _data = [];
            for (const index in resBestSellerProduct?.data) {
                labels = [...labels, resBestSellerProduct?.data[index]?.Product_Type_Name]
                _data = [..._data, resBestSellerProduct?.data[index]?.Count]
            }
            
            const randomColors = getRandomColorArray(_data.length);
            
            setBSPData({
                labels: labels,
                datasets: [
                    {
                        label: 'Total sales',
                        data: _data,
                        backgroundColor: randomColors.borderColor,
                        borderColor: randomColors.borderColor,
                        borderWidth: randomColors.borderWidth,
                    },
                ],
            });
        }
    }

    function getRandomColorArray(length) {
        const backgroundColors = [];
    
        for (let i = 0; i < length; i++) {
            const randomColor = getRandomColor();
            const backgroundColor = randomColor;
            
            backgroundColors.push(backgroundColor);
        }
    
        return {
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
        };
    }
    function getRandomHex() {
        const hexValues = '0123456789ABCDEF';
        return hexValues[Math.floor(Math.random() * 16)];
    }
    
    function getRandomColor() {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += getRandomHex();
        }
        return color;
    }
    return (
        <div className='w-full flex flex-col items-center p-10 bg-[#F0F0F0] min-h-screen'>
            <div className='flex flex-col gap-5'>
                <div className='font-bold text-brown'>Dashboard</div>
                <div className='w-[450px] bg-white flex shadow-md rounded-md p-2'>
                    <InputDate onChange={(Start_Date) => onChange({ Start_Date })} value={date?.Start_Date || ''} placeholder='StartDate' classBox='w-full' classInput='c'/>
                    <div className='flex items-center px-2 font-bold'>to</div>
                    <InputDate onChange={(End_Date) => onChange({ End_Date })} value={date?.End_Date || ''} placeholder='End Date' classBox='w-full' classInput='c'/>
                </div>
                <div className='flex lg:flex-row lg:justify-center lg:items-start flex-col items-center gap-5 w-full'>
                    <div className='relative bg-white h-[500px] sm:w-[450px] pb-10 w-full shadow-md rounded-md'>
                        <div className='font-bold text-greyV1 px-10 py-5 z-10 sticky bg-white rounded-t-md'>Best Seller Product Pie Chart</div>
                        <div className='px-10 w-full h-full'><Pie data={BSPData} /></div>
                    </div>
                    <div className='relative bg-white overflow-y-auto h-[500px] xl:w-[620px] sm:w-[450px] w-full pb-10 shadow-md rounded-md flex flex-col gap-3'>
                        <div className='font-bold text-greyV1 px-10 py-5 z-10 sticky bg-white top-0'>Best Seller Product Report</div>
                        <div className='w-full px-10 flex flex-col gap-3'>
                            {form?.map((item, index) => {
                                return <div className={`border-b border-b-hover w-full px-3  p-3 text-brown`} key={"Best-Seller-Product"+index}>
                                    <div className='pb-3 w-full font-bold text-lg'>{item?.Product_Type_Name || ''}</div>
                                    <div className='font-medium'>Total sales: {item?.Count || '0'}</div>
                                    <div className='font-medium'>Total price: <span className='font-bold text-red-500'>฿{item?.Total_Price.toFixed(2) || '0'}</span> Baht</div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className='relative w-full bg-white shadow-md rounded-md'>
                    <div className='rounded-t-md font-bold text-greyV1 px-10 py-5 z-10 sticky bg-white top-0'>Summary Revenue</div>
                    <div className='lg:w-full w-[450px] px-10 h-[450px] overflow-auto'>
                        <table className='table text-brown'>
                            <thead>
                                <tr className='h-[5vh] border-y border-hover bg-gray z-10 sticky top-0'>
                                    <th className='lg:min-w-[300px] w-[150px] l px-2'>Product Name</th>
                                    <th className='lg:min-w-[200px] w-[100px] l px-2'>Product Type Name</th>
                                    <th className='lg:min-w-[200px] w-[100px] c px-2'>Sale Date</th>
                                    <th className='lg:w-full r px-2'>Product Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form?.map((item) => {
                                    return item?.Product?.map((product, index) => {
                                        total += product?.Product_Price;
                                        return <tr className='h-[5vh] border-y border-hover hover:bg-hover' key={"Summary-Revenue"+index}>
                                            <td className='l px-2'>{product?.Product_Name || '-'}</td>
                                            <td className='l px-2'>{product?.Product_Type_Name || '-'}</td>
                                            <td className='c px-2'>{DateFormat(product?.Sale_Date) || '-'}</td>
                                            <td className='r px-2'>{product?.Product_Price.toFixed(2) || '0.00'}</td>
                                        </tr>
                                    })
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full rounded-b-md font-bold bg-white pb-10 px-10 z-10 absolute bottom-0'>
                        <div className='w-full h-[5vh] bg-gray text-brown flex items-center justify-end px-2 r'>
                            Total Revenue: {total.toFixed(2) || '0.00'}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
