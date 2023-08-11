import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
    const router = useRouter();
    
    return (
        <div className='text-brown w-full mt-5 py-10 xl:px-44 lg:px-20 px-10 border-t border-hover flex gap-5  md:flex-row md:justify-between flex-col justify-center'>
            <div className='flex gap-10'>
                <div className='flex flex-col gap-5 min-w-[150px]'>
                    <div className='uppercase text-greyV1 text-xs'>About Second Hand Store</div>
                    <a className='cursor-pointer' onClick={() => router.push(`/member/about/about-us`)}>About Us</a>
                    <a className='cursor-pointer' onClick={() => router.push(`/member/about/payment`)}>Payment</a>
                    <a className='cursor-pointer' onClick={() => router.push(`/member/about/shipping`)}>Shipping</a>
                    {/* <a className='cursor-pointer' onClick={() => router.push(`/member/about/size-guide`)}>Size Guide</a> */}
                </div>
                <div className='flex flex-col gap-5 min-w-[150px]'>
                    <div className='uppercase text-greyV1 text-xs'>Help</div>
                    <a className='cursor-pointer' onClick={() => router.push(`/member/about/contact-us`)}>Contact Us</a>
                    <a className='cursor-pointer' onClick={() => router.push(`/member/about/order-status`)}>Order Status</a>
                    {/* <a className='cursor-pointer' onClick={() => router.push(`/member/about/questions`)}>Questions</a> */}
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='uppercase text-greyV1 text-xs'>Location</div>
                <a href='https://www.google.co.th/maps/search/992%2F111+Moo.4,+Map+Pong,+Phan+Thong,+Chon+Buri,+Thailand,+20160/@13.4162094,101.081991,15z/data=!3m1!4b1?hl=th&entry=ttu' className='flex gap-2'>
                    <span><FontAwesomeIcon icon={faLocationDot} size='lg'/></span>
                    <span>992/111 Moo.4, Map Pong, Phan Thong, Chon Buri, Thailand, 20160</span>
                </a>
            </div>
        </div>
    )
}

export default Footer