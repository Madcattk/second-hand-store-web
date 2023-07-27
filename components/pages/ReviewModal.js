"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { ButtonText, InputTextArea } from '@components/inputs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { addReview } from '@app/api/getAPI/review';
import { updateSaleStatusById } from '@app/api/getAPI/sale';

const ReviewModal = ({ menu, setMenu, data, onLoad, onCheckReview }) => {
  const [form, setForm] = useState(data)
  const [rating, setRating] = useState(0);
  const onChange = (update) => setForm({ ...form, ...update })

  const handleRatingClick = (index) => {
    setRating((prevRating) => (prevRating === index ? 0 : index));
  };

  const onSave = async () => {
    const res = await addReview({
      "Review_Detail": form?.Review_Detail || null, 
      "Review_Rating": rating,
      "Product_Id": form?.Product_Id
    })

    if(res?.message === 'success'){
        toast.success("🌟 Thank you for your review! We value your feedback.", {
            autoClose: 3000,
        });
        setMenu(false)
        onLoad();
    }else{
        toast.success("❗️ Couldn't upload data.", {
            autoClose: 2000,
        });
    }
  }

  return (
    <div className='w-full h-full flex justify-center z-10 absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-20'>
      <div className='lg:w-[600px] w-[65%] h-fit p-10 mt-10 flex flex-col items-center bg-white shadow-xl'>
        <div className='w-full flex justify-end'><FontAwesomeIcon onClick={() => setMenu(false)} icon={faXmark} size="lg" className='cursor-pointer'/></div>
        <div className='w-full l font-extralight text-3xl pb-5'>Rate our product</div>
        <div className='w-full md:grid md:grid-cols-3 gap-3'>
            <div className='col-span-1 pb-3'>
              <Image src={form?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Product" width={150} height={200} className='w-[150px] h-[200px]'/>
            </div>
            <div className='col-span-2 flex flex-col font-light'>
                <span className='text-2xl font-extralight'>{form?.Product_Name || ''}</span>
                <span className='text-sm md:block hidden'>฿{form?.Product_Price?.toFixed(2) || '-'} Baht</span>
                <div className='my-5 w-full md:block hidden'>
                    <div className='flex justify-between gap-5 w-full font-light border-b p-2 border-brown'>
                        <span className='uppercase text-lg'>SIZE</span>
                        <span className='r'>{form?.Size_Name || '-'}</span>
                    </div>
                    <div className='flex justify-between gap-5 w-full font-light border-b p-2 border-brown'>
                        <span className='uppercase text-lg'>DETAIL</span>
                        <span className='r'>{form?.Product_Size_Detail || '-'}</span>
                    </div>
                </div>
                <div className='flex gap-1 pb-5'>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={"Rating"+index} className="cursor-pointer" onClick={() => handleRatingClick(index)}>
                      <FontAwesomeIcon
                        icon={index <= rating ? solidStar : regularStar}
                        size="lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
        </div>
        <InputTextArea onChange={(Review_Detail) => onChange({ Review_Detail })} value={form?.Review_Detail || ''} cols={30} rows={5} placeholder='🌟 Loved our product? Share your experience and leave us a review! Your feedback means the world to us. 🙏' classBox='w-full'/>
        <div className='w-full pt-10 grid md:grid-cols-4 grid-cols-1 gap-5'>
          <ButtonText onClick={() => onSave()} placeholder='SAVE' classBox='md:col-start-3 col-span-1'/>
          <ButtonText onClick={() => setMenu(false)} placeholder='Cancel' classBox='col-span-1'/>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal