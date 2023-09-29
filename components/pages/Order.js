"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image' 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { InputFile, ButtonText } from '@components/inputs';
import { DateFormat } from '@components/formats';
import { addPayment, editPaymentById } from '@app/api/getAPI/payment';
import { MetaProductStatus, MetaSaleStatus } from '@components/Meta';
import { updateSaleStatusById } from '@app/api/getAPI/sale';
import ReviewModal from './ReviewModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faDownload } from '@fortawesome/free-solid-svg-icons'; 
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

export const Order = ({ form, onChange, onLoad }) => {
    const router = useRouter();
    let indexText = 0;
    const onUpLoadSlip = async () => {
        if(!form?.Payment){
            const res = await addPayment({
                "Sale_Id": form?.Sale_Id, 
                "Payment_Slip": form?.Payment_Slip
            })
    
            if(res?.message === 'success'){
                const sale = await updateSaleStatusById({
                    "Sale_Id": form?.Sale_Id, 
                    "Sale_Status": MetaSaleStatus?.[1]?.id
                })
                if(sale?.message === 'success'){
                    toast.success("🤍 Uploaded slip.", {
                        autoClose: 2000,
                    });
                }else{
                    toast.success("❗️ Couldn't update status.", {
                        autoClose: 2000,
                    });
                }
            }else{
                toast.success("❗️ Couldn't upload your slip.", {
                    autoClose: 2000,
                });
            }
        }else{
            const res = await editPaymentById({
                "Sale_Id": form?.Sale_Id, 
                "Payment_Slip": form?.Payment_Slip
            })
    
            if(res?.message === 'success'){
                const sale = await updateSaleStatusById({
                    "Sale_Id": form?.Sale_Id, 
                    "Sale_Status": MetaSaleStatus?.[1]?.id
                })
                if(sale?.message === 'success'){
                    toast.success("🤍 Uploaded slip.", {
                        autoClose: 2000,
                    });
                }else{
                    toast.success("❗️ Couldn't update status.", {
                        autoClose: 2000,
                    });
                }
            }else{
                toast.success("❗️ Couldn't upload your slip.", {
                    autoClose: 2000,
                });
            }
        }
        onLoad();
    }

    const onReceive = async () =>{
        const sale = await updateSaleStatusById({
            "Sale_Id": form?.Sale_Id, 
            "Sale_Status": MetaSaleStatus?.[6]?.id
        })
        if(sale?.message === 'success'){
            toast.success("🌟 Enjoying your purchase? We'd love to hear your rating!", {
                autoClose: 3000,
            });
        }else{
            toast.success("❗️ Couldn't update status.", {
                autoClose: 2000,
            });
        }
        onLoad()
    }

    return (
        <div className='w-full flex_center flex-col gap-5'>
            <ol className="flex flex-col md:flex-row font-light px-5 items-center xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 text-sm text-center text-greyV1 dark:text-greyV1 sm:text-base">
                {MetaSaleStatus?.map((item, index) => {
                    const indexSale = MetaSaleStatus?.findIndex((item) => item?.id === form?.Sale_Status);
                    if(index !== 3 && index !== 4){
                        indexText += 1
                        if (index <= indexSale && index !== MetaSaleStatus.length-1) {
                            return  <li key={"Progress"+index} className="flex md:w-full items-center text-brown dark:text-brown sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-brown after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-3 dark:after:border-brown">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-1 after:text-greyV1 dark:after:text-greyV1">
                                            {index === 2 && (indexSale === 3 || indexSale ===4) ?
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2.5" height="1em" viewBox="0 0 512 512">
                                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                                </svg>
                                            :
                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                </svg>
                                            }
                                            {index === 0 ? 'Pending' : index === 2 && indexSale === 3 ? MetaSaleStatus?.[3]?.name : index === 2 && indexSale === 4 ? MetaSaleStatus?.[4]?.name : item?.name}
                                        </span>
                                    </li>
                            } else if (index <= indexSale && index === MetaSaleStatus.length-1) {
                            return   <li key={"Progress"+index} className="flex items-center text-brown dark:text-brown">
                                        <span className="flex items-center">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                            </svg>
                                            {index === 0 ? 'Pending' : item?.name}
                                        </span>
                                    </li>
                            }else if (index === MetaSaleStatus.length-1) {
                            return   <li key={"Progress"+index} className="flex items-center">
                                        <span className="mr-2">{indexText}</span>
                                        {index === 0 ? 'Pending' : item?.name}
                                    </li>
                            }else {
                            return  <li key={"Progress"+index} className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-greyV1 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-3 dark:after:border-greyV1">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-1 after:text-greyV1 dark:after:text-greyV1">
                                            <span className="mr-2">{indexText}</span>
                                            {index === 0 ? 'Pending' : item?.name}
                                        </span>
                                    </li>
                        }
                    }
                })}
            </ol>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5'>
                <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                    <span><FontAwesomeIcon icon={faCircleLeft} className='cursor-pointer' onClick={() => router.back()}/> ORDER NO: {form?.Sale_Id || ''}</span>
                    <span className='text-sm'>Date: {DateFormat(form?.Sale_Date) || ''}</span>
                    <span className='flex gap-1'>
                        <span>{form?.Sale_Status || ''}</span>
                        {(form?.Sale_Status === MetaSaleStatus?.[2]?.id || form?.Sale_Status === MetaSaleStatus?.[5]?.id || form?.Sale_Status === MetaSaleStatus?.[6]?.id) &&
                            <a href={`/pdf/${form?.Sale_Id}`} target='_blank' rel="noopener noreferrer" className='text-sm font-light'><FontAwesomeIcon icon={faDownload} size="lg" /></a>
                        }
                    </span>
                </div>
                <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                    <div>
                    <div>{form?.Address?.Fullname || ''}</div>
                    <div>{form?.Address?.Address || ''} {form?.Address?.District || ''} {form?.Address?.Province || ''} {form?.Address?.Zipcode || ''} {form?.Address?.Country || ''}</div>
                    <div>Phone: {form?.Address?.Phone || ''}</div>
                    </div>
                    <div>Tracking Number: {form?.Sale_Tracking_Number || '-'}</div>
                </div>
                <div className='w-full flex justify-between text-[10px] font-light'>
                    <span>PRODUCT</span>
                    <span>PRICE</span>
                </div>
                <div className='w-full border-y border-brown py-2'>
                    {form?.Product?.map((item, index, array) => (
                        <React.Fragment key={"Customer-Order"+index}>
                            <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                <div className='md:col-span-2 flex gap-2'>
                                    <div>
                                        <Image className='w-[80px] h-[100px] object-cover' src={item?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
                                    </div>
                                    <div className='flex flex-col font-light'>
                                        <span>{item?.Product_Name || ''}</span>
                                        <span className='text-xs'>Size: {item?.Size_Name || '-'}</span>
                                        <span className='text-xs'>Detail: {item?.Product_Size_Detail || '-'}</span>
                                    </div>
                                </div>
                                <div className='md:col-start-3 r font-light'>฿{item?.Product_Price?.toFixed(2) || '-'} Baht</div>
                            </div>  
                            {index !== array.length - 1 && <div className='md:col-start-3 border-b border-gray my-2'></div>}
                        </React.Fragment>
                    ))}
                </div>
                {form?.Promotion_Id &&
                    <>
                        <div className='w-full r'>Subtotal ฿{form?.Sale_Total_Price?.toFixed(2)} Baht</div>
                        <div className='w-full border-b border-gray'></div> 
                        <div className='w-full r'>{form?.Promotion_Name || ''} ฿{((parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Discount / 100)) || 0).toFixed(2) || '0.00'} Baht</div>
                        <div className='w-full border-b border-gray'></div> 
                    </>
                }
                <div className='w-full r'>Total ฿{form?.Discounted_Total_Price?.toFixed(2) || form?.Sale_Total_Price?.toFixed(2)} Baht</div>
                {(form?.Sale_Status === MetaSaleStatus?.[0]?.id ||  form?.Sale_Status === MetaSaleStatus?.[3]?.id) &&
                    <>
                        <div className='w-full border-b border-gray'></div>
                        <div className='flex md:flex-row flex-col w-full md:gap-3 gap-0'>
                            <div className='text-sm shadow border border-gray p-5 my-3 md:w-[30%] w-full'>
                                <div className='w-full h-[90%]'>
                                    <div className='py-3'>
                                        <Image src={"/assets/images/payment/scb.jpeg"} alt="Bank" width={60} height={20}/>
                                    </div>
                                    <span className=''>
                                        Siam Commercial Bank PCL. <br />
                                        Account Number: 345-455-3453 <br />
                                        Account Name: Second Hand store <br />
                                    </span>
                                </div>
                                <div className='w-full l text-xs text-greyV1'>Upload slip here. ( later within 3 days )</div>
                            </div>
                            <InputFile onChange={(Payment_Slip) => onChange({ Payment_Slip })} value={form?.Payment_Slip || ''} buttonText='Upload Slip' placeholder='Profile Picture' classBox='w-full md:w-[70%] w-full'/>
                        </div>
                        <div className='w-full flex justify-end'><ButtonText onClick={() => onUpLoadSlip()} placeholder='UPLOAD' classBox='w-72'/></div>
                    </>
                }
                {
                    form?.Sale_Status === MetaSaleStatus?.[5]?.id &&
                    <>
                        <div className='w-full border-b border-gray'></div>
                        <div className='w-full flex justify-end'><ButtonText onClick={() => onReceive()} placeholder='RECEIVE PRODUCT' classBox='w-72'/></div>
                    </>
                }
            </div>
        </div>
    )
}

export const Review = ({ form, onChange, onLoad }) => {
    const router = useRouter();
    let indexText = 0;
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState(null);

    const onReview = (data) => {
        setMenu(true)
        setData(data)
    }
    return (
        <div className='w-full flex_center relative flex-col gap-5'>
            <ol className="flex flex-col md:flex-row font-light px-5 items-center xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 text-sm text-center text-greyV1 dark:text-greyV1 sm:text-base">
                {MetaSaleStatus?.map((item, index) => {
                    const indexSale = MetaSaleStatus?.findIndex((item) => item?.id === form?.Sale_Status);
                    if(index !== 3 && index !== 4){
                        indexText += 1
                        if (index <= indexSale && index !== MetaSaleStatus.length-1) {
                            return  <li key={"Progress"+index} className="flex md:w-full items-center text-brown dark:text-brown sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-brown after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-3 dark:after:border-brown">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-1 after:text-greyV1 dark:after:text-greyV1">
                                            {index === 2 && (indexSale === 3 || indexSale ===4) ?
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2.5" height="1em" viewBox="0 0 512 512">
                                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                                </svg>
                                            :
                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                </svg>
                                            }
                                            {index === 0 ? 'Pending' : index === 2 && indexSale === 3 ? MetaSaleStatus?.[3]?.name : index === 2 && indexSale === 4 ? MetaSaleStatus?.[4]?.name : item?.name}
                                        </span>
                                    </li>
                            } else if (index <= indexSale && index === MetaSaleStatus.length-1) {
                            return   <li key={"Progress"+index} className="flex items-center text-brown dark:text-brown">
                                        <span className="flex items-center">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                            </svg>
                                            {index === 0 ? 'Pending' : item?.name}
                                        </span>
                                    </li>
                            }else if (index === MetaSaleStatus.length-1) {
                            return   <li key={"Progress"+index} className="flex items-center">
                                        <span className="mr-2">{indexText}</span>
                                        {index === 0 ? 'Pending' : item?.name}
                                    </li>
                            }else {
                            return  <li key={"Progress"+index} className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-greyV1 after:border-1 after:hidden sm:after:inline-block after:mx-2 xl:after:mx-3 dark:after:border-greyV1">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-1 after:text-greyV1 dark:after:text-greyV1">
                                            <span className="mr-2">{indexText}</span>
                                            {index === 0 ? 'Pending' : item?.name}
                                        </span>
                                    </li>
                        }
                    }
                })}
            </ol>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5'>
                <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                    <span><FontAwesomeIcon icon={faCircleLeft} className='cursor-pointer' onClick={() => router.back()}/> ORDER NO: {form?.Sale_Id || ''}</span>
                    <span className='text-sm'>Date: {DateFormat(form?.Sale_Date) || ''}</span>
                    <span className='flex gap-1'>
                        <span>{form?.Sale_Status || ''}</span>
                        <a href={`/pdf/${form?.Sale_Id}`} target='_blank' rel="noopener noreferrer" className='text-sm font-light'><FontAwesomeIcon icon={faDownload} size="lg" /></a>
                    </span>
                </div>
                <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                    <div>
                    <div>{form?.Address?.Fullname || ''}</div>
                    <div>{form?.Address?.Address || ''} {form?.Address?.District || ''} {form?.Address?.Province || ''} {form?.Address?.Zipcode || ''} {form?.Address?.Country || ''}</div>
                    <div>Phone: {form?.Address?.Phone || ''}</div>
                    </div>
                    <div>Tracking Number: {form?.Sale_Tracking_Number || '-'}</div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3 text-[10px] font-light'>
                    <span>PRODUCT</span>
                    <span className='r md:block hidden'>PRICE</span>
                    <span className='r md:block hidden'>REVIEW</span>
                </div>
                <div className='w-full border-y border-brown py-2'>
                    {form?.Product?.map((item, index, array) => (
                        <React.Fragment key={"Customer-Order"+index}>
                            <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                <div className='flex gap-2'>
                                    <div>
                                        <Image className='w-[80px] h-[100px] object-cover' src={item?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
                                    </div>
                                    <div className='flex flex-col font-light'>
                                        <span>{item?.Product_Name || '-'}</span>
                                        <span className='text-xs'>Size: {item?.Size_Name || '-'}</span>
                                        <span className='text-xs'>Detail: {item?.Product_Size_Detail || '-'}</span>
                                    </div>
                                </div>
                                <div className='r font-light'>฿{item?.Product_Price?.toFixed(2) || '-'} Baht</div>
                                {item?.Review_Id ?
                                    <div className='w-full flex justify-end'><ButtonText onClick={() => router.push(`/member/product/${item?.Product_Id}`)} placeholder='CHECK YOUR REVIEW' classBox='lg:w-52 sm:w-44 w-full'/></div>
                                :
                                    <div className='w-full flex justify-end'><ButtonText onClick={() => onReview(item)} placeholder='REVIEW' classBox='lg:w-52 sm:w-44 w-full'/></div>
                                }
                            </div>  
                            {index !== array.length - 1 && <div className='md:col-start-3 border-b border-gray my-2'></div>}
                        </React.Fragment>
                    ))}
                </div>
                {form?.Promotion_Id &&
                    <>
                        <div className='w-full r'>Subtotal ฿{form?.Sale_Total_Price?.toFixed(2)} Baht</div>
                        <div className='w-full border-b border-gray'></div> 
                        <div className='w-full r'>{form?.Promotion_Name || ''} ฿{((parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Discount / 100)) || 0).toFixed(2) || '0.00'} Baht</div>
                        <div className='w-full border-b border-gray'></div> 
                    </>
                }
                <div className='w-full r'>Total ฿{form?.Discounted_Total_Price?.toFixed(2) || form?.Sale_Total_Price?.toFixed(2)} Baht</div>
            </div>
            {menu && <ReviewModal menu={menu} setMenu={setMenu} data={data} onLoad={onLoad}/>}  
        </div>
    )
}
