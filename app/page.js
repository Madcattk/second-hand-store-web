"use client";
import DesktopGallery from '@components/pages/DesktopGallery';
import ImageFooter from '@components/pages/ImageFooter';
import ShopAll from '@components/pages/ShopAll';
import React from 'react';

export default function Home() {
  return (
    <div className='flex flex-col items-center w-full'>
      <DesktopGallery/>
      <ShopAll/>
      <ImageFooter/>
    </div>
  )
}
