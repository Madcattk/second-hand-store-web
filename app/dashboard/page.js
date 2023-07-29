"use client"
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getBestSellerProductReport } from '@app/api/getAPI/sale';
import { DateFormat } from '@components/formats';

const Page = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [form, setForm] = useState([])
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

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => {
        const resBestSellerProduct = await getBestSellerProductReport({
            "Start_Date": '2023-01-01',
            "End_Date": '2023-12-31'
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
                        backgroundColor: randomColors.backgroundColor,
                        borderColor: randomColors.borderColor,
                        borderWidth: randomColors.borderWidth,
                    },
                ],
            });
        }
    }

    function getRandomColorArray(length) {
        const backgroundColors = [];
        const borderColors = [];
    
        for (let i = 0; i < length; i++) {
            const randomColor = getRandomColor();
            const backgroundColor = `${randomColor}33`; // Adding alpha value (0.2 * 255 = 51) for rgba
            const borderColor = randomColor;
            
            backgroundColors.push(backgroundColor);
            borderColors.push(borderColor);
        }
    
        return {
            backgroundColor: backgroundColors,
            borderColor: borderColors,
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
            <div className='flex lg:flex-row lg:justify-center lg:items-start flex-col items-center gap-10 w-full p-10'>
                <div className='relative bg-white lg:h-[550px] sm:h-[500px] lg:w-[500px] sm:w-[450px] pb-10 w-full shadow-md rounded-md'>
                    <div className='font-bold text-greyV1 px-10 py-5 z-10 sticky bg-white top-0 rounded-t-md'>Best Seller Product Pie Chart</div>
                    <div className='px-10 w-full h-full'><Pie data={BSPData} width={550} height={550} /></div>
                </div>
                <div className='relative bg-white overflow-y-auto lg:h-[550px] sm:h-[500px] lg:w-[850px] sm:w-[450px] w-full pb-10 shadow-md rounded-md flex flex-col gap-3'>
                    <div className='font-bold text-greyV1 px-10 py-5 z-10 sticky bg-white top-0'>Best Seller Product Report</div>
                    <div className='w-full px-10 flex flex-col gap-3'>
                        {form?.map((item, index) => {
                            return <div className={`border-b border-b-brown w-full px-3  p-3 text-brown`} key={"Best-Seller-Product"+index}>
                                <div className='pb-3 w-full font-bold text-lg'>{item?.Product_Type_Name || ''}</div>
                                <div className='font-medium'>Total sales: {item?.Count || '0'}</div>
                                <div className='font-medium'>Total price: <span className='font-bold text-red-500'>฿{item?.Total_Price.toFixed(2) || '0'}</span> Baht</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default Page;
