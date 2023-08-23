"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import validator from 'validator';
import { ButtonText, InputBox, InputDate, InputFile, InputSelect } from '@components/inputs'
import { MetaSex } from '@components/Meta';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { addMember } from '@app/api/getAPI/member';
import { saveToLocalStorage, getFromLocalStorage } from '@lib/localStorage';
import { addEmployee } from '@app/api/getAPI/employee';
import Loading from '@components/pages/Loading';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const page = () => {
  const router = useRouter();
  const auth = getFromLocalStorage('auth')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({Member_Image: null})
  const [password, setPassword] = useState(true)
  const onChange = (update) => setForm({ ...form, ...update })

  useEffect(() => {
    if (auth === null) setLoading(false)
  },[])
  
  const onSave = async () => { 
    if(!(form?.Member_Username && form?.email && form?.password && form?.birth_date && form?.sex && form?.firstname && form?.lastname && form?.phone)) {
      return toast.error("❗️Please fill out all the fields", {
        autoClose: 2000,
      });
    }
    
    if(!validator.isEmail(form?.email)){
      return toast.error("❗️Please make sure you enter a valid email address (e.g., example@example.com).", {
        autoClose: 2000,
      });
    }

    if(form?.password?.length < 8) {
      return toast.error("❗️Your password must consist of a minimum of 8 characters.", {
        autoClose: 2000,
      });
    }


    const res = await addMember({
      "Member_Firstname": form?.firstname || '',
      "Member_Lastname": form?.lastname || '',
      "Member_Username": form?.Member_Username || '',
      "Member_Email": form?.email || '',
      "Member_Password": form?.password || '',
      "Member_Sex": form?.sex || '',
      "Member_Birth_Date": form?.birth_date || '',
      "Member_Image": form?.image || '',
      "Member_Phone": form?.phone || '',
    })
    
    if(res?.message === 'success'){
      saveToLocalStorage('auth', res?.data || null)
      toast.success("🤍 Welcome to Second Hand Store", {
          autoClose: 2000,
      });
      router.push('/');     
    }
    else if(res?.message === 'duplicated'){
      toast.error("❗️This email has already been used.", {
          autoClose: 2000,
      });
    }
    else{
        toast.error("❗️Something wrong", {
            autoClose: 2000,
        });
    }
  }

  return (
    <Loading loading={loading}>
      <div className='w-full h-fit flex flex-col items-center'>
        <div className='font-extralight text-3xl pb-16'>Create Account</div>
        {/* <InputSelect onChange={(status) => onChange({ status })} options={[{id: false, name: 'Create account as a customer'}, {id: true, name: 'Admin'}]} value={form?.status || false} classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/> */}
          <div className='flex lg:w-[500px] md:w-[450px] sm:w-96 w-72'>
            <InputBox onChange={(firstname) => onChange({ firstname })} value={form?.firstname || ''} placeholder='Name' classBox='w-full border-r border-brown'/>
            <InputBox onChange={(lastname) => onChange({ lastname })} value={form?.lastname || ''} placeholder='Surname' classBox='w-full'/>
          </div>
          {/* {!(form?.status === 'true' || form?.status === true) && <InputBox onChange={(Member_Username) => onChange({ Member_Username })} value={form?.Member_Username || ''} placeholder='Username' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>} */}
          <InputBox onChange={(Member_Username) => onChange({ Member_Username })} value={form?.Member_Username || ''} placeholder='Username' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
          <InputDate onChange={(birth_date) => onChange({ birth_date })} value={form?.birth_date || ''} placeholder='Birth Date' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
          <InputFile onChange={(image) => onChange({ image })} value={form?.image || ''} placeholder='Profile Picture' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
          <InputSelect onChange={(sex) => onChange({ sex })} value={form?.sex || ''} options={MetaSex} placeholder='Gender' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
          <div className='flex lg:w-[500px] md:w-[450px] sm:w-96 w-72'>
            <InputBox onChange={(email) => onChange({ email })} value={form?.email || ''} placeholder='Email' classBox='w-full border-r border-brown'/>
            <div className='relative w-full'>
                { password ? 
                    <div className='absolute right-0 top-1/2 transform -translate-y-1/2'>
                        <FontAwesomeIcon onClick={() => setPassword(!password)} className='cursor-pointer' icon={faEyeSlash} />
                    </div>
                :
                    <div className='absolute right-0 top-1/2 transform -translate-y-1/2'>
                        <FontAwesomeIcon onClick={() => setPassword(!password)} className='cursor-pointer' icon={faEye} />
                    </div>
                }
                <InputBox password={password} onChange={(password) => onChange({ password })} value={form?.password || ''} placeholder='Password' classBox='w-full' classInput='pr-6'/>
            </div>
          </div>
          <InputBox number={true} onChange={(phone) => onChange({ phone })} value={form?.phone || ''} placeholder='Phone Number' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72'/>
          <ButtonText onClick={() => onSave()} placeholder='REGISTER' classBox='lg:w-[500px] md:w-[450px] sm:w-96 w-72 pb-2 pt-14'/>
        <span onClick={() => router.push('/login')} className='font-extralight cursor-pointer hover:underline text-sm pb-10'>Already have an account?</span>
      </div>
    </Loading>
  )
}

export default page