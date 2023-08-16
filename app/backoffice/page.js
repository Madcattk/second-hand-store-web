"use client"
import DesktopGallery from '@components/pages/DesktopGallery';
import ShopAll from '@components/pages/ShopAll';
import React from 'react';

// const backoffice = () => {
//   return <div>Back Office</div>
// }
// export default backoffice
export default function Home() {
  return (
    <div className='flex flex-col items-center w-full'>
      <DesktopGallery/>
      <ShopAll/>
    </div>
  )
}


