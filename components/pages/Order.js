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

export const Order = ({ form, onChange, onLoad }) => {

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
        <div className='w-full flex_center'>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5'>
                <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                    <span>ORDER NO: {form?.Sale_Id || ''}</span>
                    <span className='text-sm'>Date: {DateFormat(form?.Sale_Date) || ''}</span>
                    <span>{form?.Sale_Status || ''}</span>
                </div>
                <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                    <div>
                    <div>{form?.Address?.Fullname || ''}</div>
                    <div>{form?.Address?.Address || ''} {form?.Address?.District || ''} {form?.Address?.Province || ''} {form?.Address?.Zipcode || ''}</div>
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
                                        <Image src={form?.Product?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
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
                        <div className='w-full r'>{form?.Promotion_Name || ''} ฿{((parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Discount / 100)) || 0).toFixed(2) || '0.00'} Baht</div>
                        <div className='w-full border-b border-gray'></div> 
                    </>
                }
                <div className='w-full r'>Subtotal ฿{form?.Discounted_Total_Price?.toFixed(2) || form?.Sale_Total_Price?.toFixed(2)} Baht</div>
                {(form?.Sale_Status === MetaSaleStatus?.[0]?.id ||  form?.Sale_Status === MetaSaleStatus?.[3]?.id) &&
                    <>
                        <div className='w-full border-b border-gray'></div>
                        <InputFile onChange={(Payment_Slip) => onChange({ Payment_Slip })} value={form?.Payment_Slip || ''} placeholder='Profile Picture' classBox='w-full'/>
                        <label htmlFor="Payment_Slip" className='w-full l text-xs text-greyV1'>Upload slip here. ( later within 3 days )</label>
                        <div className='w-full flex justify-end'><ButtonText onClick={() => onUpLoadSlip()} placeholder='UPLOAD' classBox='w-72'/></div>
                    </>
                }
                {
                    form?.Sale_Status === MetaSaleStatus?.[5]?.id &&
                    <div className='w-full flex justify-end'><ButtonText onClick={() => onReceive()} placeholder='RECEIVE PRODUCT' classBox='w-72'/></div>
                }
            </div>
        </div>
    )
}

export const Review = ({ form, onChange, onLoad }) => {
    const router = useRouter();
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState(null);

    const onReview = (data) => {
        setMenu(true)
        setData(data)
    }
    return (
        <div className='w-full flex_center relative'>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5'>
                <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                    <span>ORDER NO: {form?.Sale_Id || ''}</span>
                    <span className='text-sm'>Date: {DateFormat(form?.Sale_Date) || ''}</span>
                    <span>{form?.Sale_Status || ''}</span>
                </div>
                <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                    <div>
                    <div>{form?.Address?.Fullname || ''}</div>
                    <div>{form?.Address?.Address || ''} {form?.Address?.District || ''} {form?.Address?.Province || ''} {form?.Address?.Zipcode || ''}</div>
                    <div>Phone: {form?.Address?.Phone || ''}</div>
                    </div>
                    <div>Tracking Nuber: {form?.Sale_Tracking_Number || '-'}</div>
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
                                        <Image src={form?.Product?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={80} height={100}/>
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
                        <div className='w-full r'>{form?.Promotion_Name || ''} ฿{((parseFloat(form?.Sale_Total_Price) * (form?.Promotion_Discount / 100)) || 0).toFixed(2) || '0.00'} Baht</div>
                        <div className='w-full border-b border-gray'></div> 
                    </>
                }
                <div className='w-full r'>Subtotal ฿{form?.Discounted_Total_Price?.toFixed(2) || form?.Sale_Total_Price?.toFixed(2)} Baht</div>
            </div>
            {menu && <ReviewModal menu={menu} setMenu={setMenu} data={data} onLoad={onLoad}/>}  
        </div>
    )
}