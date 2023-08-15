"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonText, InputBox, InputSelect } from '@components/inputs'
import { saveToLocalStorage, getFromLocalStorage } from '@lib/localStorage';
import { loginMember } from '@app/api/getAPI/member';
import { loginEmployee } from '@app/api/getAPI/employee';
import { useDispatch } from 'react-redux';
import { inputAuth } from '@redux/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import Loading from '@components/pages/Loading';

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const onChange = (update) => setForm({ ...form, ...update })
  
  useEffect(() => {
    setAuth(getFromLocalStorage('auth'))
  },[])

  useEffect(() => {
    if(auth?.Member_Id) router.push('/member/account');
    else if (auth === null) setLoading(false)
  },[auth])

  const onSave = async () => {  
    if(!(form?.email && form?.password)) {
      return toast.error("❗️Please fill out the fields.", {
          autoClose: 2000,
      });
    }
    form.status = form?.status === 'true' ? true : form?.status === true ? true : false;

    if(!form?.status){
      const res = await loginMember(form?.email, form?.password);
      if(res?.message === 'success' && res?.data?.[0]){
        let authData = res?.data?.[0] || null
        saveToLocalStorage('auth', authData);
        router.push('/member/account');  
      } else {
        toast.error("❗️Email or password is invalid.", {
            autoClose: 2000,
        });
      }
    } else {
      const res = await loginEmployee(form?.email, form?.password);
      if(res?.message === 'success' && res?.data?.[0]){
        let authData = res?.data?.[0] || null
        saveToLocalStorage('auth', authData);
        router.push('/backoffice');  
        dispatch(inputAuth(authData))
      } else {
        toast.error("❗️Email or password is invalid.", {
            autoClose: 2000,
        });
      }
    }
  }
  
  return (
    <Loading loading={loading}>
      <div className='w-full h-fit lg:grid lg:grid-cols-2 lg:px-0 md:px-44'>
        <div className='lg:border-r lg:border-r-brown flex items-center flex-col'>
          <div className='pb-14'>
            <div className='font-extralight text-3xl pb-16'>Sign In</div>
            <InputBox onChange={(email) => onChange({ email })} value={form?.email} placeholder='Email' classBox='lg:w-[400px] md:w-[450px] sm:w-96 w-72'/>
            <InputBox password={true} onChange={(password) => onChange({ password })} value={form?.password} placeholder='Password' classBox='lg:w-[400px] md:w-[450px] sm:w-96 w-72'/>
            <InputSelect onChange={(status) => onChange({ status })} options={[{id: false, name: 'Login as a customer'}, {id: true, name: 'Admin'}]} value={form?.status || false} classBox='lg:w-[400px] md:w-[450px] sm:w-96 w-72 pb-14'/>
            <ButtonText onClick={() => onSave()} placeholder='SIGN IN' classBox='lg:w-[400px] md:w-[450px] sm:w-96 w-72 pb-2'/>
          </div>
          <hr className='show lg:hidden lg:w-[400px] md:w-[450px] sm:w-96 w-72 border-1 border-brown'/>
        </div>
        <div className='flex items-center flex-col lg:pt-5 pt-10'>
          <div>
            <div className='font-extralight text-3xl pb-5'>New Account</div>
              <ButtonText onClick={() => router.push('/register')} placeholder='CREATE ACCOUNT' classBox='lg:w-[400px] md:w-[450px] sm:w-96 w-72'/>
          </div>
        </div>
      </div>
    </Loading>
  )
}

export default page

// ส่วน (email) => onChange({ email }) คือ Arrow Function ที่ถูกกำหนดให้กับ onChange prop ของ <InputBox> component.

// เมื่อผู้ใช้ป้อนข้อมูลในช่อง input และเกิดเหตุการณ์ onChange ขึ้นในอิลิเมนต์ <input> 
// ฟังก์ชัน Arrow Function ที่ถูกส่งใน onChange prop จะถูกเรียกใช้ 
// และค่าที่ผู้ใช้ป้อนในช่อง input จะถูกส่งเข้าไปใน Arrow Function นี้เป็นพารามิเตอร์ email.

// ดังนั้นค่า email ใน Arrow Function นั้นจะมาจากค่าที่ผู้ใช้ป้อนลงในช่อง input 
// เมื่อเกิดเหตุการณ์ onChange ขึ้น กล่าวคือ email คือค่าที่ผู้ใช้ป้อนลงในช่อง input นั่นเอง 
// ดังนั้น email ใน Arrow Function คือค่าที่มาจากผู้ใช้ป้อนในช่อง input 
// และจะถูกส่งไปยังฟังก์ชัน onChange ใน <InputBox> เพื่ออัปเดตค่าในตัวแปร form หรือปฏิสัมพันธ์กับข้อมูลอื่น ๆ ตามที่ได้นิยามไว้ในฟังก์ชัน onChange.