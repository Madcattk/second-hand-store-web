"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonText, InputBox } from '@components/inputs'
import { addMemberAddressById, editMemberAddressById } from '@app/apis/member-addresses';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';

const AddressModal = ({ menu, setMenu, add, address, setAdd, setAddress, data, onLoad }) => {
  const [form, setForm] = useState(address)
  const onChange = (update) => setForm({ ...form, ...update })
  
  const onSave = async () => {
    if(!(form?.fullname && form?.address && form?.district && form?.province && form?.zipcode && form?.phone)) {return }

    let address = (form?.fullname || '') + '%' + (form?.address || '') + '%' + (form?.district || '') + '%' + (form?.province || '') + '%' + (form?.zipcode || '') + '%' + (form?.phone || '')
    
    if(form?._id){
      let res = await editMemberAddressById({
        '_id': form?._id || '',
        'member_id': data || '',
        'member_address': address || ''
      });
      if(res?.message === 'success'){
        onLoad()
        setMenu(0);
        setAdd(true);
        setAddress(null);
        toast.success("🤍 Edited address", {
            autoClose: 2000,
        });
      }
      else{
          toast.error("❗️Couldn't edit address", {
              autoClose: 2000,
          });
      }
    } else {
      let res = await addMemberAddressById({
        'member_id': data || '',
        'member_address': address || ''
      })
      if(res?.message === 'success'){
        onLoad()
        setMenu(0);
        setAdd(true);
        setAddress(null);
        toast.success("🤍 Added address", {
            autoClose: 2000,
        });
      }
      else{
          toast.error("❗️Couldn't add address", {
              autoClose: 2000,
          });
      }
    }
  }

  return (
    <div className='w-full h-full flex justify-center z-10 absolute bg-white bg-opacity-20'>
      <div className='lg:w-[700px] w-[70%] h-fit p-10 mt-10 flex flex-col items-center bg-white shadow-xl'>
        <div className='w-full flex justify-end'><FontAwesomeIcon onClick={() => {setMenu(0); setAdd(true); setAddress(null);}} icon={faXmark} size="lg" className='cursor-pointer'/></div>
        <div className='w-full l font-extralight text-3xl pb-5'>{add ? 'New Address' : 'Edit Address'}</div>
        <InputBox onChange={(fullname) => onChange({ fullname })} value={form?.fullname || ''} placeholder='Fullname' classBox='w-full'/>
        <InputBox onChange={(address) => onChange({ address })} value={form?.address || ''} placeholder='Address' classBox='w-full'/>
        <div className='flex w-full'>
          <InputBox onChange={(district) => onChange({ district })} value={form?.district || ''} placeholder='District' classBox='w-full border-r border-brown'/>
          <InputBox onChange={(province) => onChange({ province })} value={form?.province || ''} placeholder='Province' classBox='w-full'/>
        </div>
        <div className='flex w-full'>
          <InputBox number={true} onChange={(zipcode) => onChange({ zipcode })} value={form?.zipcode || ''} placeholder='Zip code' classBox='w-full border-r border-brown'/>
          <InputBox number={true} onChange={(phone) => onChange({ phone })} value={form?.phone || ''} placeholder='Phone' classBox='w-full'/>
        </div>
        <div className='w-full pt-10 grid md:grid-cols-4 grid-cols-2 gap-5'>
          <ButtonText onClick={() => onSave()} placeholder='SAVE' classBox='md:col-start-3 col-span-1'/>
          <ButtonText onClick={() => {setMenu(0); setAdd(true); setAddress(null);}} placeholder='Cancel' classBox='col-span-1'/>
        </div>
      </div>
    </div>
  )
}

export default AddressModal