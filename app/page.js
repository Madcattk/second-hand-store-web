"use client";
import ShopAll from '@components/pages/ShopAll';
import React from 'react';

export default function Home() {
  return (
    <div className='flex justify-center w-full'>
        <div className='xl:w-[1200px] lg:w-[900px] md:w-[700px] sm:w-[500px] w-[500px] grid lg:grid-cols-9 md:grid-cols-6 grid-cols-4 gap-4 px-10'>
          <ShopAll/>
          <div>y</div>
        </div>
    </div>
  )
}
