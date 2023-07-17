"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonText, InputBox, InputDate, InputFile, InputSelect } from '@components/inputs'
import { MetaSex } from '@components/Meta';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { addMember } from '@app/api/getAPI/member';
import { saveToLocalStorage, getFromLocalStorage } from '@lib/localStorage';

const page = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(null)
  const [form, setForm] = useState({Member_Image: null, status: false})
  const onChange = (update) => setForm({ ...form, ...update })

  useEffect(() => {
    setAuth(getFromLocalStorage('auth'))
  },[])

  useEffect(() => {
    if(auth?.Member_Id) router.push('/member/account');
  },[auth])
  
  const onSave = async () => {  
    form.status = form?.status === 'true' ? true : form?.status === true ? true : false;

    if((!form?.status) && (!form?.Member_Username)) {
      return toast.error("❗️Please fill out all the fields", {
          autoClose: 2000,
      });
    }
    if(!(form?.Member_Email && form?.Member_Password && form?.Member_Birth_Date && form?.Member_Sex && form?.Member_Firstname && form?.Member_Lastname && form?.Member_Phone)) {
      return toast.error("❗️Please fill out all the fields", {
        autoClose: 2000,
      });
    }

    if(!form.status){
      let status = delete form?.status
      const res = await addMember(form)
      if(res?.message === 'success'){
        saveToLocalStorage('auth', res?.data || null)
        toast.success("🤍 Welcome to Second Hand Store", {
            autoClose: 2000,
        });
        router.push('/');     
      }
      else{
          toast.error("❗️Something wrong", {
              autoClose: 2000,
          });
      }
    }
  }

  return (
    <div className='w-full h-fit flex flex-col items-center'>
        <div className='font-extralight text-3xl pb-16'>Create Account</div>
        <InputSelect onChange={(status) => onChange({ status })} options={[{id: false, name: 'Create account as a customer'}, {id: true, name: 'Admin'}]} value={form?.status || false} classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
        {(form?.status === 'false' || form?.status === false) &&
          <>
            <div className='flex lg:w-[500px] md:w-[450px] sm:w-96 w-72'>
              <InputBox onChange={(Member_Firstname) => onChange({ Member_Firstname })} value={form?.Member_Firstname || ''} placeholder='Name' classBox='w-full border-r border-brown'/>
              <InputBox onChange={(Member_Lastname) => onChange({ Member_Lastname })} value={form?.Member_Lastname || ''} placeholder='Surname' classBox='w-full'/>
            </div>
            {!(form?.status === 'true' || form?.status === true) && <InputBox onChange={(Member_Username) => onChange({ Member_Username })} value={form?.Member_Username || ''} placeholder='Username' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>}
            <InputDate onChange={(Member_Birth_Date) => onChange({ Member_Birth_Date })} value={form?.Member_Birth_Date || ''} placeholder='Birth Date' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
            <InputFile onChange={(Member_Image) => onChange({ Member_Image })} value={form?.Member_Image || ''} placeholder='Profile Picture' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
            <InputSelect onChange={(Member_Sex) => onChange({ Member_Sex })} value={form?.Member_Sex || ''} options={MetaSex} placeholder='Gender' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
            <div className='flex lg:w-[500px] md:w-[450px] sm:w-96 w-72'>
              <InputBox onChange={(Member_Email) => onChange({ Member_Email })} value={form?.Member_Email || ''} placeholder='Email' classBox='w-full border-r border-brown'/>
              <InputBox onChange={(Member_Password) => onChange({ Member_Password })} value={form?.Member_Password || ''} placeholder='Password' classBox='w-full'/>
            </div>
            <InputBox number={true} onChange={(Member_Phone) => onChange({ Member_Phone })} value={form?.Member_Phone || ''} placeholder='Phone Number' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
            <ButtonText onClick={() => onSave()} placeholder='REGISTER' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72 pb-2 pt-14'/>
          </>
        }
        <span onClick={() => router.push('/login')} className='font-extralight cursor-pointer hover:underline text-sm'>Already have an account?</span>
      </div>
  )
}

export default page