"use client";
import { MetaProductSex } from '@components/Meta';
import DesktopGallery from '@components/pages/DesktopGallery';
import ImageFooter from '@components/pages/ImageFooter';
import ShopAll from '@components/pages/ShopAll';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inputSearch } from '@redux/searchSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductTypesById } from './api/getAPI/product-type';

export default function Home() {
  const searchValue = useSelector((state) => state.search.value)
  const dispatch = useDispatch()
  const [topic, setTopic] = useState(null)
  const [form, setForm] = useState({
      searchInput: '',
      searchType: '',
      searchSex: ''
  })

  useEffect(() => {     
    setTopic(null)
    setForm({...form, searchSex: ''})
    if(searchValue?.searchType) onLoad()
  },[searchValue?.searchType])

  useEffect(() => {     
      dispatch(inputSearch({
        'searchInput': searchValue?.searchInput || '',
        'searchType': searchValue?.searchType || '',
        'searchSex': form?.searchSex || searchValue?.searchSex
      }))
  },[form?.searchSex])

  const onLoad = async() => {
    const res = await getProductTypesById(searchValue?.searchType);
    if(res?.message === 'success'){
      setTopic(res?.data?.[0] || null)
    }
}
  
  return (
    <div className='flex flex-col items-center w-full'>
      <DesktopGallery/>
        <div className='xl:w-[1200px] lg:w-[900px] md:w-[700px] sm:w-[500px] w-[500px] font-light tracking-wide px-10 py-2'>
          {(topic?.Product_Type_Name || searchValue?.searchSex) && <div className='font-light text-[50px] pb-5'>{topic?.Product_Type_Name || searchValue?.searchSex}</div>}
          {searchValue?.searchType && 
            <span className='flex gap-3'>
                Filter:
                <select value={form?.searchSex} onChange={(e) => setForm({...form, searchSex: e.target.value})} className='outline-none border-none cursor-pointer px-1'>
                  <option value={''}>All</option>
                  {MetaProductSex?.map((item, index) => {
                    return <option key={"Product-Sex"+index} value={item.id}>{item.name}</option>
                  })}
                </select>
            </span>
          }
        </div>
      <ShopAll/>
      <ImageFooter/>
    </div>
  )
}
