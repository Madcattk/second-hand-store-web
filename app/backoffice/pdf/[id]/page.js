"use client"
import React, { useEffect, useState } from 'react';
import { getBestSellerProductReport } from '@app/api/getAPI/sale';
import { DateFormat } from '@components/formats';
import html2pdf from 'html2pdf.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'next/navigation';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const page = () => {
    const { id } = useParams()
    let _d = id?.split('%');
    const [form, setForm] = useState([])
    const [date, setDate] = useState({
        Start_Date: _d?.[0],
        End_Date: _d?.[1]
    });
    let total = 0;

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => {
        if(!(date?.Start_Date && date?.End_Date)) { return }

        const resBestSellerProduct = await getBestSellerProductReport({
            "Start_Date": date?.Start_Date,
            "End_Date": date?.End_Date
        }) 
        if(resBestSellerProduct.message == 'success'){
            setForm(resBestSellerProduct?.data || [])
        }
    }

    const convertToPDF = () => {
        const content = document.getElementById('pdf-content');
        // html2pdf().from(content).save();
        html2pdf().from(content)
            .set()
            .toPdf()
            .get('pdf')
            .then((pdf) => downloadPdf(pdf));
    };

    const downloadPdf = (pdf) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.href = pdf.output('bloburl');
        link.download = 'second_hand_store_report_' + date?.Start_Date + '_' + date?.End_Date + '.pdf';
        link.click();
        link.remove();
    }

    return (
        <div className='flex_center w-full h-full gap-10'>
            <div className='px-16 pb-16 h-fit w-fit bg-gray rounded-lg shadow-md'>
                <div className='w-full flex justify-end'>
                    <button className='cursor-pointer py-2 px-4 my-4 shadow-md rounded-lg bg-white hover:bg-hover ' onClick={convertToPDF}>Download <FontAwesomeIcon icon={faFileArrowDown} size="lg" /></button>
                </div>
                <div className='border bg-white h-[297mm] overflow-y-auto'>
                    <div id="pdf-content" className={`w-[210mm] text-[12px] bg-white px-5`}>
                        <div className='w-full flex justify-center font-bold text-[14px] py-5'>Report for the period: {date?.Start_Date} to {date?.End_Date}</div>
                        <div className='font-bold py-3 text-[13px]'>Best Seller Product Report</div>
                        <div className='w-full flex flex-col gap-1'>
                            {form?.map((item, index) => {
                                return <div className={`border-b border-hover w-full pb-3 text-brown`} key={"Best-Seller-Product"+index}>
                                    <div className='pb-1 w-full font-bold'>{item?.Product_Type_Name || ''}</div>
                                    <div className=''>Total sales: {item?.Count || '0'}</div>
                                    <div className=''>Total price: <span className='font-bold text-red-500'>฿{item?.Total_Price.toFixed(2) || '0'}</span> Baht</div>
                                </div>
                            })}
                        </div>
                        <div className='font-bold py-4 text-[13px]'>Summary Revenue</div>
                        <table className='table text-brown'>
                            <thead>
                                <tr className='border-y border-hover bg-hover'>
                                    <th className='w-2/12 l p-2'>Product Name</th>
                                    <th className='w-2/12 l p-2'>Product Type Name</th>
                                    <th className='w-2/12 c p-2'>Sale Date</th>
                                    <th className='w-2/12 c p-2'>Sale Status</th>
                                    <th className='w-2/12 r p-2'>Product Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form?.map((item) => {
                                    return item?.Product?.map((product, index) => {
                                        total += product?.Product_Price;
                                        return <tr className='items-center border-b border-hover' key={"Summary-Revenue"+index}>
                                            <td className='l p-2'>{product?.Product_Name || '-'}</td>
                                            <td className='l p-2'>{product?.Product_Type_Name || '-'}</td>
                                            <td className='c p-2'>{DateFormat(product?.Sale_Date) || '-'}</td>
                                            <td className='c p-2'>{product?.Sale_Status || '-'}</td>
                                            <td className='r p-2'>฿{product?.Product_Price.toFixed(2) || '0.00'}</td>
                                        </tr>
                                    })
                                })}
                            </tbody>
                        </table>
                        <div className='w-full bg-hover text-brown flex items-center justify-end py-2 mb-5 r font-bold'>
                            Total Revenue: ฿{total.toFixed(2) || '0.00'} Baht
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page