"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonText, InputBox, InputDate, InputFile, InputSelect } from '@components/inputs'
import { MetaSex } from '@components/Meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';
import { editMemberById } from '@app/api/getAPI/member';
import { saveToLocalStorage } from '@lib/localStorage';
import { DateFormat } from '@components/formats';
// import { deleteMemberAddressById } from '@app/apis/member-addresses';


const CustomerProfileModal = ({ onLoad, menu, setMenu, data, setAdd, setAddress }) => {
    const router = useRouter();
    const onChange = (update) => setForm({ ...form, ...update })
    const [form, setForm] = useState(data || {})

    useEffect(() => {
        setForm(data)
    },[data])

    const onEdit = async () => {
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

        if(!form?.status){
            const res = await editMemberById(form)
            if(res?.message === 'success'){
                saveToLocalStorage('auth', res?.data)
                onLoad()
                toast.success("🤍 Edited profile", {
                    autoClose: 2000,
                });
            }
            else{
                toast.error("❗️Couldn't edit profile", {
                    autoClose: 2000,
                });
            }
        }
    } 

    const onDelete = async (id) => {
        const res = await deleteMemberAddressById(id)
        if(res?.message === 'success'){
            toast.success("🤍 Deleted address", {
                autoClose: 2000,
            });
        }
        else{
            toast.error("❗️Couldn't delete address", {
                autoClose: 2000,
            });
        }
    }

    return (
        <div className='w-full grid md:grid-cols-3 grid-cols-1'>
            <div className='md:col-span-2'>
                <div className='font-extralight text-3xl pb-5'>Profile</div>
                <div className='flex w-full'>
                    <InputBox onChange={(Member_Firstname) => onChange({ Member_Firstname })} value={form?.Member_Firstname || ''} placeholder='Name' classBox='w-full border-r border-brown'/>
                    <InputBox onChange={(Member_Lastname) => onChange({ Member_Lastname })} value={form?.Member_Lastname || ''} placeholder='Surname' classBox='w-full'/>
                </div>
                {!(form?.status === 'true' || form?.status === true) && <InputBox onChange={(Member_Username) => onChange({ Member_Username })} value={form?.Member_Username || ''} placeholder='Username' classBox='w-full'/>}
                <InputDate onChange={(Member_Birth_Date) => onChange({ Member_Birth_Date })} value={DateFormat(form?.Member_Birth_Date || '')} placeholder='Birth Date' classBox='w-full'/>
                <InputFile onChange={(Member_Image) => onChange({ Member_Image })} value={form?.Member_Image || ''} placeholder='Profile Picture' classBox='w-full'/>
                <InputSelect onChange={(Member_Sex) => onChange({ Member_Sex })} value={form?.Member_Sex || ''} options={MetaSex} placeholder='Gender' classBox='w-full'/>
                <div className='flex w-full'>
                    <InputBox onChange={(Member_Email) => onChange({ Member_Email })} value={form?.Member_Email || ''} placeholder='Email' classBox='w-full border-r border-brown'/>
                    <InputBox onChange={(Member_Password) => onChange({ Member_Password })} value={form?.Member_Password || ''} placeholder='Password' classBox='w-full'/>
                </div>
                <InputBox onChange={(Member_Phone) => onChange({ Member_Phone })} value={form?.Member_Phone || ''} placeholder='Phone Number' classBox='w-full'/>
                <ButtonText onClick={() => onEdit()} placeholder='EDIT PROFILE' classBox='w-full pb-2 pt-10'/>
            </div>
            <div className='flex flex-col w-full md:pl-10 gap-3 mb-3'>
            <ButtonText onClick={() => setMenu(3)} placeholder='ADD NEW ADDRESS' classBox='w-full'/>
                {form?.addresses?.map((item,index) => (
                    <div className='p-3 border border-brown w-full font-light' key={"Customer-Address"+index}>
                        <div className='w-full flex gap-3 justify-end'>
                            <FontAwesomeIcon onClick={() => {setAdd(false); setAddress(item); setMenu(3);}} icon={faPenToSquare} className='cursor-pointer'/>
                            <FontAwesomeIcon onClick={() => onDelete(item?._id || '')} icon={faTrashCan} className='cursor-pointer'/>
                        </div>
                        <div>{item?.fullname || ''}</div>
                        <div>{item?.address || ''} {item?.district || ''} {item?.province || ''} {item?.zipcode || ''}</div>
                        <div>Phone: {item?.phone || ''}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerProfileModal