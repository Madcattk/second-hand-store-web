"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation' 
import { ButtonText, TransparentButtonText } from '@components/inputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { getProductById } from '@app/api/getAPI/product'
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';

const page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [auth, setAuth] = useState(null)
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
            setForm(res?.data?.[0])
        }
    }

    const onAdd= (buy) => {
        if(auth){
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
        }
    }

    return (      
        <div className='w-full flex justify-center'>
            <div className='flex flex-col items-start md:flex-row md:justify-center gap-12'>
                <div className='flex justify-start items-start l'>
                    <Image
                        src={ form?.Product_Image || "/assets/images/avatars/no-image.png"}
                        alt="Product"
                        width={280}
                        height={0}
                        className='lg:h-[450px] h-[330px] object-cover w-full hover:scale-[1.01] transform transition-transform duration-200'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-3xl'>{form?.Product_Name || ''}</span>
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
                    {form?.Product_Status === 'Available' ?
                    <>
                        <TransparentButtonText onClick={() => onAdd(true)} placeholder='BUY NOW' classBox='md:w-[400px] w-[300px]'/>
                        <ButtonText onClick={() => onAdd(false)} placeholder='ADD TO CART' classBox='md:w-[400px] w-[300px]'/>
                        <div className='md:w-[400px] w-[300px] font-light text-sm'>
                            {form?.Product_Description || ''}
                        </div>
                    </>
                    :
                    <div className='md:w-[400px] w-[300px] font-light text-sm'>
                        <div className='flex flex-col md:flex-row gap-1 items-start md:items-center'>
                            <div className='flex gap-1'>
                                <FontAwesomeIcon icon={solidStar} size='lg'/>
                                <FontAwesomeIcon icon={solidStar} size='lg'/>
                                <FontAwesomeIcon icon={solidStar} size='lg'/>
                                <FontAwesomeIcon icon={solidStar} size='lg'/>
                                <FontAwesomeIcon icon={regularStar} size='lg'/>
                            </div>
                            <span className='font-normal text-lg'>4.0 rated by our customer</span>
                        </div>
                        <div className='w-full'>
                            Super cute vintage jean vest in mint condition and only worn once!! Super cute vintage jean vest in mint condition and only worn once!! Super cute vintage jean vest in mint condition and only worn once!! Super cute vintage jean vest in mint condition and only worn once!!
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )     
}

export default page     