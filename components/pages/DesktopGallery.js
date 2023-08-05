import React from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const DesktopGallery = () => {
    const searchValue = useSelector((state) => state.search.value)
    const carouselImages = [
        '/assets/images/desktops/333_img_desktop.jpg',
        '/assets/images/desktops/334_img_desktop.jpg',
        '/assets/images/desktops/335_img_desktop.jpg'
    ];
    return (
        <>
        { (!(searchValue.searchInput || searchValue.searchType || searchValue.searchSex)) &&
            <div className='w-full h-[85vh] mb-5 relative'>               
                <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={4000} // Change image every 5 seconds
                showThumbs={false} // Hide thumbnail navigation
                showStatus={false} // Hide slide number status
                showIndicators={false} // Hide indicators
                >
                {carouselImages.map((imageUrl, index) => (
                    <div key={index} className='w-full h-[80vh] relative'>
                        <Image src={imageUrl} fill={true} alt='' priority={true} className='object-cover' />
                    </div>
                ))}
                </Carousel>
            </div>
        }
        </>
    )
}

export default DesktopGallery