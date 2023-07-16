"use client";

import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars, faUserShield, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage';
import { useSelector, useDispatch } from 'react-redux'
import { inputSearch, clearSearch } from '@redux/searchSlice';

const NavMember = ({ children }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [auth, setAuth] = useState(null)
    const [search, setSearch] = useState({})
    
    useEffect(() => {
        onLoad()
        let value = {
            searchInput: '',
            searchType: 'hi',
            searchSex: ''
        }
        dispatch(inputSearch(value))
    },[])
    
    const onLoad = () => {
        setAuth(getFromLocalStorage('auth'))
    };

    return (
        <>
            <div className="flex_center h-16 text-brown text-base font-light">
                <div className="hidden md:flex md:justify-start">
                    <div className="group relative">
                        <button onClick={() => router.push('/')} className="menu-hover border-none bg-white text-base font-light pr-8">SHOP</button>
                        <div className={"absolute left-0 pt-2 bg-white z-10 invisible group-hover:visible"}>
                            <a href="#" className="block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">TOPS</a>
                            <a href="#" className="block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">SKIRTS</a>
                            <a href="#" className="block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">BAGS</a>
                        </div>
                    </div>
                    <div className="group relative">
                        <button className="menu-hover border-none bg-white text-base font-light pr-8">FILTER</button>
                        <div className="absolute left-0 pt-2 bg-white z-10 invisible group-hover:visible">
                            <a href="#" className="block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">MEN</a>
                            <a href="#" className="block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">WOMEN</a>
                            <a href="#" className="block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">OTHERS</a>
                        </div>
                    </div>
                </div>
                <div className="md:hidden l group relative">
                    <button className="menu-hover"><FontAwesomeIcon icon={faBars} /></button>
                    <div className="absolute left-0 pt-2 bg-white z-10 invisible group-hover:visible">
                        <a href="#" className="block px-1 py-2 cursor-pointer hover:bg-hover"><FontAwesomeIcon icon={faSearch} /></a>
                        <a onClick={() => router.push(`/member/cart`)} className="block px-1 py-2 cursor-pointer hover:bg-hover"><FontAwesomeIcon icon={faShoppingCart} /></a>
                        <a onClick={() => router.push('/login')} className="block px-1 py-2 cursor-pointer hover:bg-hover"><FontAwesomeIcon icon={faUser} /></a>
                    </div>
                </div>
                <div className="w-72 xl:w-[780px] lg:w-[480px] md:w-[280px] transform-none text-center text-2xl font-bold cursor-pointer">       
                    <a onClick={() => router.push('/')} className="no-underline text-gray-800">Second Hand Store</a>
                </div>
                <div className="hidden md:flex md:justify-end">
                    <a href="#" className="block px-6 py-2 cursor-pointer">
                        <FontAwesomeIcon icon={faSearch} />
                    </a>
                    <a onClick={() => router.push('/login')} className="block px-6 py-2 cursor-pointer">
                        <FontAwesomeIcon icon={faUser} />
                    </a>
                    <a className="block px-6 py-2 cursor-pointer">
                        <FontAwesomeIcon onClick={() => router.push(`/member/cart`)} icon={faShoppingCart} />
                    </a>
                </div>
            </div>

            <div className='pt-10'>{children}</div>
        </>
    )
}

export default NavMember