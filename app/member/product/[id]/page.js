"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation' 
import { ButtonText, TransparentButtonText } from '@components/inputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { getProductById } from '@app/api/getAPI/product'

const page = () => {
    const { id } = useParams();

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = () => {
        
    }
    return (      
        <div className='w-full flex justify-center'>
            <div className='flex flex-col items-start md:flex-row md:justify-center gap-12'>
                <div className='flex justify-start items-start l'>
                    <Image
                        src="/assets/images/products/JeanVest.jpg"
                        alt="Product"
                        width={280}
                        height={0}
                        className='lg:h-[450px] h-[330px] object-cover w-full hover:scale-[1.01] transform transition-transform duration-200'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-3xl'>Jean Vest</span>
                    <span className='font-light'>฿255.00 Baht</span>
                    <span className='font-light text-sm'>Shipping calculated in price.</span>
                    <div className='flex flex-col gap-2 my-6 md:w-[400px] w-[300px]'>
                        <div className='flex justify-between gap-5 w-full font-light border-b px-2 border-brown'>
                            <span className='uppercase text-lg'>SIZE</span>
                            <span className='r'>S</span>
                        </div>
                        <div className='flex justify-between gap-5 w-full font-light border-b px-2 border-brown'>
                            <span className='uppercase text-lg'>DETAIL</span>
                            <span className='r'>Chest: 32, Waist: 24-25</span>
                        </div>
                    </div>
                    <TransparentButtonText onClick={() => onSave()} placeholder='BUY NOW' classBox='md:w-[400px] w-[300px]'/>
                    <ButtonText onClick={() => onSave()} placeholder='ADD TO CART' classBox='md:w-[400px] w-[300px]'/>
                    <div className='md:w-[400px] w-[300px] font-light text-sm'>
                        Super cute vintage jean vest in mint condition and only worn once!! Super cute vintage jean vest in mint condition and only worn once!! Super cute vintage jean vest in mint condition and only worn once!! Super cute vintage jean vest in mint condition and only worn once!!
                    </div>
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
                </div>
            </div>
        </div>
    )     
}

export default page     