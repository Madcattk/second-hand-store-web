"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonText, InputBox } from '@components/inputs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { addMemberAddressById, editMemberAddressById } from '@app/api/getAPI/member';

const AddressModal = ({ menu, setMenu, add, address, setAdd, setAddress, data, onLoad }) => {
  const [form, setForm] = useState(address)
  const onChange = (update) => setForm({ ...form, ...update })
  
  const onSave = async () => {
    if (!(form?.Fullname && form?.Address && form?.District && form?.Province && form?.Zipcode && form?.Country && form?.Phone) ||
        (form.Fullname.includes("%") ||
        form.Address.includes("%") ||
        form.District.includes("%") ||
        form.Province.includes("%") ||
        form.Zipcode.includes("%") ||
        form.Country.includes("%") ||
        form.Phone.includes("%"))
      ) {
        return toast.error("❗️Please fill out all the fields without using '%'", {
          autoClose: 2000,
        });
      }

    let addr = (form?.Fullname || '') + '%' + (form?.Address || '') + '%' + (form?.District || '') + '%' + (form?.Province || '') + '%' + (form?.Zipcode || '') + '%' + (form?.Country || '') + '%' + (form?.Phone || '') + '%'
    
    let res = form?.Member_Id ? 
      await editMemberAddressById({
        'Member_Id': form?.Member_Id || '',
        'Member_Address': address.Member_Address || '',
        'New_Member_Address': addr || '',
      })
    :
      await addMemberAddressById({
        'Member_Id': data || '',
        'Member_Address': addr || ''
      });

    if(res?.message === 'success'){
      onLoad()
      setMenu(0);
      setAdd(true);
      setAddress(null);
      toast.success("🤍 Successfully saved", {
          autoClose: 2000,
      });
    }
    else{
        toast.error("❗️Couldn't save your address", {
            autoClose: 2000,
        });
    }
  }

  return (
    <div className='w-full h-full flex justify-center z-10 absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-20'>
      <div className='lg:w-[700px] w-[70%] h-fit p-10 mt-10 flex flex-col items-center bg-white shadow-xl'>
        <div className='w-full flex justify-end'><FontAwesomeIcon onClick={() => {setMenu(0); setAdd(true); setAddress(null);}} icon={faXmark} size="lg" className='cursor-pointer'/></div>
        <div className='w-full l font-extralight text-3xl pb-5'>{add ? 'New Address' : 'Edit Address'}</div>
        <InputBox onChange={(Fullname) => onChange({ Fullname })} value={form?.Fullname || ''} placeholder='Fullname' classBox='w-full'/>
        <InputBox onChange={(Address) => onChange({ Address })} value={form?.Address || ''} placeholder='Address' classBox='w-full'/>
        <div className='flex w-full'>
          <InputBox onChange={(District) => onChange({ District })} value={form?.District || ''} placeholder='District' classBox='w-full border-r border-brown'/>
          <InputBox onChange={(Province) => onChange({ Province })} value={form?.Province || ''} placeholder='Province' classBox='w-full'/>
        </div>
        <div className='flex w-full'>
          <InputBox number={true} onChange={(Zipcode) => onChange({ Zipcode })} value={form?.Zipcode || ''} placeholder='Zip code' classBox='w-full border-r border-brown'/>
          <InputBox onChange={(Country) => onChange({ Country })} value={form?.Country || ''} placeholder='Country' classBox='w-full'/>
        </div>
        <div className='flex w-full'>
          <InputBox number={true} onChange={(Phone) => onChange({ Phone })} value={form?.Phone || ''} placeholder='Phone' classBox='w-full'/>
        </div>
        <div className='w-full pt-10 grid md:grid-cols-4 grid-cols-1 gap-5'>
          <ButtonText onClick={() => onSave()} placeholder='SAVE' classBox='md:col-start-3 col-span-1'/>
          <ButtonText onClick={() => {setMenu(0); setAdd(true); setAddress(null);}} placeholder='Cancel' classBox='col-span-1'/>
        </div>
      </div>
    </div>
  )
}

export default AddressModal