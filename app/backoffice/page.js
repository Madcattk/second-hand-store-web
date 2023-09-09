"use client"
import DesktopGallery from '@components/pages/DesktopGallery';
import ShopAll from '@components/pages/ShopAll';
import Footer from '@components/pages/Footer';
import React from 'react';
import ImageFooter from '@components/pages/ImageFooter';

export default function Home() {
  return (
    <div className='flex flex-col items-center w-full'>
      <DesktopGallery/>
      <ShopAll/>
      <ImageFooter/>
      <Footer/>
    </div>
  )
}


