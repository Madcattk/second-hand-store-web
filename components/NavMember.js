"use client";
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'
import { inputSearch } from '@redux/searchSlice';
import { getAllProductTypes } from '@app/api/getAPI/product-type';
import { MetaProductSex } from './Meta';
import { InputBox } from './inputs';
import { getLatestProduct } from '@app/api/getAPI/product';
import Footer from './pages/Footer';
import { signIn } from '@auth/authMember';
import { signIn as signInEmp } from '@auth/authEmployee';

const NavMember = ({ children }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const url = usePathname()
    const { id } = useParams()
    const [search, setSearch] = useState(false)
    const [meta, setMeta] = useState({})
    const [form, setForm] = useState({
        searchInput: '',
        searchType: '',
        searchSex: ''
    })

    useEffect(() => {
        if((!signIn()) && (url !== '/' && url !== '/login' && url !== '/register' && url !== `/member/product/${id}`&& url !== `/member/about/${id}`)) router.replace('/login')

        if(signIn() && (url === '/login' || url === '/register')) router.replace('/member/account')
        else if(signInEmp() && (url === '/login' || url === '/register')) router.replace('/backoffice/account')
    },[url])
    
    useEffect(() => {
        onLoad()
    },[])

    useEffect(() => {     
        dispatch(inputSearch(form))
    },[form])

    const onLoad = async () => {
        let res = await getAllProductTypes()
        if(res?.message === 'success' && res?.data){
            setMeta({...meta, Product_Type: res?.data})
        }
    };
    
    const onLatestItem = async() => {
        const res = await getLatestProduct();
        if(res?.data?.[0]?.Product_Id) router.push(`/member/product/${res?.data?.[0]?.Product_Id}`);
    }

    const onChange = (update) => setForm({ ...update, searchType: '', searchSex: '' })
    return (
        <div className='relative'>
            <div onClick={() => onLatestItem()} className="flex_center py-2 bg-brown text-white text-sm font-extralight cursor-pointer hover:bg-opacity-90">Discover Our Exquisite Pre-Loved Gem Today &rarr;</div>
            <div className="sticky top-0 z-50 flex_center py-4 text-brown text-base font-light bg-white">
                <div className="hidden md:flex md:justify-start">
                    <div className="group relative">
                        <button onClick={() => {setForm({searchInput: '', searchType: '', searchSex: ''});router.push('/');}} className="menu-hover border-none bg-white text-base font-light pr-8">SHOP</button>
                        <div className={"absolute left-0 pt-2 bg-white z-50 invisible group-hover:visible"}>
                            {meta?.Product_Type?.map((item, index) => {
                                return <a key={"Product_Type"+index} onClick={() => {setForm({searchInput: '', searchType: item?.Product_Type_Id, searchSex: ''});router.push('/');}} className="uppercase block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">{item?.Product_Type_Name}</a>
                            })}
                        </div>
                    </div>
                    <div className="group relative">
                        <button className="menu-hover border-none bg-white text-base font-light pr-8">FILTER</button>
                        <div className="absolute left-0 pt-2 bg-white z-50 invisible group-hover:visible">
                        {MetaProductSex?.map((item, index) => {
                                return <a key={"Product_Type"+index} onClick={() => {setForm({searchInput: '', searchType: '', searchSex: item?.id});router.push('/');}} className="uppercase block pl-1 pr-4 py-2 cursor-pointer hover:bg-hover">{item?.name}</a>
                            })}
                        </div>
                    </div>
                </div>
                <div className="md:hidden l group relative">
                    <button className="menu-hover"><FontAwesomeIcon icon={faBars} /></button>
                    <div className="absolute left-0 pt-2 bg-white z-50 invisible group-hover:visible">
                        <a onClick={() => {setSearch(!search); if(!search)setForm({...form, searchInput: ''});router.push('/');}} className="block px-1 py-2 cursor-pointer hover:bg-hover"><FontAwesomeIcon icon={faSearch} /></a>
                        <a onClick={() => router.push(`/member/cart`)} className="block px-1 py-2 cursor-pointer hover:bg-hover"><FontAwesomeIcon icon={faShoppingCart} /></a>
                        <a onClick={() => router.push('/login')} className="block px-1 py-2 cursor-pointer hover:bg-hover"><FontAwesomeIcon icon={faUser} /></a>
                    </div>
                </div>
                <div className="w-72 xl:w-[780px] lg:w-[480px] md:w-[280px] transform-none text-center text-2xl font-bold cursor-pointer">       
                    <a onClick={() => {setForm({searchInput: '', searchType: '', searchSex: ''});router.push('/');}} className="no-underline text-brown">Second Hand Store</a>
                </div>
                <div className="hidden md:flex md:justify-end">
                    <a onClick={() => {setSearch(!search); if(!search)setForm({...form, searchInput: ''});router.push('/');}} className="block px-6 py-2 cursor-pointer">
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
            {search && 
                <div className='flex_center pb-10'>
                    <InputBox onChange={(searchInput) => onChange({ searchInput })} value={form?.searchInput || ''} placeholder='Search' classBox='md:w-[500px] w-[300px]'/>
                </div>
            }
            <div className=''>{children}</div>
            <Footer/>
        </div>
    )
}

export default NavMember