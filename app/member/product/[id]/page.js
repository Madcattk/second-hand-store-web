"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation' 
import { ButtonText, TransparentButtonText } from '@components/inputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { getProductById, getProductByProductTypeId } from '@app/api/getAPI/product'
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { MetaProductStatus } from '@components/Meta'
import Loading from '@components/pages/Loading'

const page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({})

    useEffect(() => {
        onLoadAuth()
        onLoad()
    },[])

    const onLoadAuth = () => {
        setAuth(getFromLocalStorage('auth')); 
    }

    const onLoad = async () => {
        const res = await getProductById(id);
        if(res?.message === 'success' && res?.data?.[0]){
            const resForecast = await getProductByProductTypeId({
                'Product_Id': res?.data?.[0]?.Product_Id,
                'Product_Type_Id': res?.data?.[0]?.Product_Type_Id
            })
            if(res?.message === 'success' && res?.data){
                setForm({...res?.data?.[0], Forecast: resForecast?.data})
            }
        }
        setLoading(false)
    }
    
    const onAdd= (buy) => {
        if(auth?.Member_Id){
            if(auth?.Product_Id){
                if (!auth.Product_Id.includes(form?.Product_Id)) {
                    auth.Product_Id.push(form?.Product_Id);
                    toast.success("🤍 Added to cart", {
                        autoClose: 2000,
                    });
                }
                else{
                    toast.error("❗️ The product is already in your cart", {
                        autoClose: 2000,
                    });
                }
            }else{
                auth.Product_Id = [form?.Product_Id];
                toast.success("🤍 Added to cart", {
                    autoClose: 2000,
                });
            }
    
            saveToLocalStorage('auth', auth);
            onLoadAuth();
            if(buy) router.push('/member/cart')
        }
        else{
            toast.error("❗️ You should register before buying our products.", {
                autoClose: 2000,
            });
            router.push('/login')
        }
    }

    return (      
        <Loading loading={loading}>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col items-start md:flex-row md:justify-center gap-12'>
                        <div className='flex justify-start items-start l'>
                            <Image
                                src={ form?.Product_Image || "/assets/images/avatars/no-image.png"}
                                alt="Product"
                                width={280}
                                height={0}
                                className='lg:h-[550px] lg:w-[450px] h-[400px] w-[300px] object-cover'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-3xl max-w-[300px]'>{form?.Product_Name || ''}</span>
                            <span className='font-light'>฿{form?.Product_Price?.toFixed(2)} Baht</span>
                            <span className='font-light text-sm'>Shipping calculated in price.</span>
                            <div className='flex flex-col gap-2 my-6 md:w-[400px] w-[300px]'>
                                <div className='flex justify-between gap-5 w-full font-light border-b px-2 border-brown'>
                                    <span className='uppercase text-lg'>SIZE</span>
                                    <span className='r'>{form?.Size_Name || '-'}</span>
                                </div>
                                <div className='flex justify-between gap-5 w-full font-light border-b px-2 border-brown'>
                                    <span className='uppercase text-lg'>DETAIL</span>
                                    <span className='r'>{form?.Product_Size_Detail || '-'}</span>
                                </div>
                            </div>
                            {form?.Product_Status === MetaProductStatus?.[0]?.id ?
                            <>
                                <TransparentButtonText onClick={() => onAdd(true)} placeholder='BUY NOW' classBox='md:w-[400px] w-[300px]'/>
                                <ButtonText onClick={() => onAdd(false)} placeholder='ADD TO CART' classBox='md:w-[400px] w-[300px]'/>
                                <div className='md:w-[400px] w-[300px] font-light text-sm'>
                                    {form?.Product_Description || ''}
                                </div>
                            </>
                            :
                            <div className='md:w-[400px] w-[300px] font-light text-sm border-2 border-dashed p-2'>
                                The product is currently reserved and unavailable for purchase. We apologize for any inconvenience this may cause. Please stay tuned for further updates regarding its availability. Thank you for your understanding.    
                            </div>
                            }
                        </div>
                    </div>
                    <div className='w-full py-5 mb-20 px-4 lg:px-0'>
                        <div className='text-2xl py-5'>You may also like</div>
                        <div className='grid grid-cols-4 gap-2 lg:h-[250px] md:h-[210px] sm:h-[180px] h-[145px] text-sm md:text-base'>
                            {form?.Forecast?.map((item, index) => {
                                return <div onClick={() => router.push(`/member/product/${item?.Product_Id}`)} key={"Image-Footer"+index} className='items-center c font-light col-span-1 h-full cursor-pointer'>
                                    <div className='w-full h-full relative overflow-hidden'>
                                        <Image src={item?.Product_Image || "/assets/images/avatars/no-image.png"} fill={true} alt='' priority={true} className='object-cover hover:scale-[1.01] transform transition-transform duration-200 relative'/>
                                    </div>
                                    <div className='pt-2 c w-full flex flex-col items-center'>
                                        <span className='max-w-[180px]'>
                                            {item?.Product_Name && item.Product_Name.length > 17
                                            ? item.Product_Name.substring(0, 17) + '...'
                                            : item.Product_Name}
                                        </span>
                                        <span className='c max-w-[180px]'>฿ {form?.Product_Price?.toFixed(2)} Baht</span>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    {form?.Review_Rating &&
                        <div className='w-full flex justify-center md:justify-start px-4 lg:px-0'>
                            <div className='mb-10 shadow md:w-[400px] w-[300px] p-3 border border-hover flex flex-col gap-3'>
                                <div className='flex gap-2'>
                                    <div className='flex gap-1'>
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <div key={"Rating"+index}>
                                            <FontAwesomeIcon
                                                icon={index <= parseInt(form?.Review_Rating) ? solidStar : regularStar}
                                                size="lg"
                                                style={{color: "#edc845",}}
                                            />
                                            </div>
                                        ))}
                                    </div>
                                    <span className='font-semibold text-lg'>{parseInt(form?.Review_Rating || 0).toFixed(1)}</span>
                                </div>
                                {form?.Review_Detail &&
                                    <div className='w-full font-light text-sm'>
                                        <span className='font-semibold'>{form?.Member_Username ? form?.Member_Username?.[0] + "****" + form?.Member_Username?.slice(-1) : ""}:</span>
                                        <span className='pl-2'>{form?.Review_Detail}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Loading>
    )     
}

export default page     