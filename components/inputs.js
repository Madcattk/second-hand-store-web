"use client";
import { useState, useRef } from "react";
import { resolve } from "styled-jsx/css";
import Image from 'next/image'

export const ButtonText = ({ classBox = "", placeholder = "", onClick }) => (
    <div className={`${classBox}`}>
        <button onClick={onClick} type={'submit'} className="w-full transition-all duration-200 py-3 border border-brown outline-none c bg-brown hover:bg-white text-white hover:text-brown hover:font-light font-extralight tracking-widest uppercase">{placeholder}</button>
    </div>
);

export const TransparentButtonText = ({ classBox = "", placeholder = "", onClick }) => (
    <div className={`${classBox}`}>
        <button onClick={onClick} type={'submit'} className="w-full transition-all duration-200 py-3 border border-brown outline-none c bg-white hover:bg-brown text-brown hover:text-white hover:font-extralight font-light tracking-widest uppercase">{placeholder}</button>
    </div>
);

export const InputBox = ({ value = "", onChange, classBox = "", classInput = "", placeholder = "", number = null, password = null }) => {
    return (
        <div className={`${classBox}`}>
            <input
                className={`${classInput} border-b-brown border-b px-1 py-3 outline-none w-full text-brown`}
                type={password ? 'password' : 'text'}
                value={value}
                onChange={(e) => onChange ? onChange(number ? e.target.value.replace(/[^0-9]/g, '') : e.target.value) : {}}
                placeholder={placeholder}
            />
        </div>
    );
};

export const InputTextArea = ({ value = "", onChange, classBox = "", placeholder = "", number = null, cols, rows }) => {
    return (
        <div className={`${classBox}`}>
            <textarea
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                className={`border-brown border px-1 py-3 outline-none w-full text-brown`}
                onChange={(e) => onChange ? onChange(number ? e.target.value.replace(/[^0-9]/g, '') : e.target.value) : {}}
                value={value}
            />
        </div>
    );
};

export const InputDate = ({ value = "", onChange, classBox = "",classInput = "", placeholder = "" }) => {
    return (
        <div className={`${classBox}`}>
            <input
                className={`${classInput} border-b-brown border-b px-1 py-3 outline-none w-full text-brown cursor-pointer`}
                type={'text'}
                value={value}
                onChange={(e) => onChange ? onChange(e.target.value) : {}}
                placeholder={placeholder}
                onMouseOver={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
            />
        </div>
    );
};

export const InputFile = ({ value = "", onChange, classBox = "", placeholder = "", topath = 'account', buttonText = 'Upload File' }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const onSaveFile = async (e) => {
        let file = e.target.files[0];
        try {
            const base64 = await convertToBase64(file);
            // setImage(base64)
            onChange(base64)      
        } catch (error) {
            
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    
    return (
        <div className={`${classBox} flex_center my-3 py-3 border-dashed border-2 border-brown`}>
            <div className="flex flex-col items-center justify-center gap-3 min-h-[235px]">
                {value && 
                    <Image
                    src={value || ''}
                    alt="Image"
                    width={150}
                    height={180}
                    className='object-cover w-[150px] h-[180px]'
                />}
                {/* <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="180" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" id="mainIconPathAttribute"></path> <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" id="mainIconPathAttribute"></path> </svg>
                </div> */}
                <button className='w-[150px] transition-all duration-200 py-2 border border-brown outline-none c bg-brown hover:bg-white text-white hover:text-brown hover:font-light font-extralight tracking-widest uppercase' onClick={handleButtonClick}>{buttonText}</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className='hidden'
                    onChange={onSaveFile}
                />
            </div>
        </div>
    );
};

export const WhiteInputFile = ({ value = "", onChange, classBox = "", placeholder = "", topath = 'account' }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const onSaveFile = async (e) => {
        let file = e.target.files[0];
        try {
            const base64 = await convertToBase64(file);
            // setImage(base64)
            onChange(base64)
        } catch (error) {
            
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    
    return (
        <div className={`${classBox} flex_center my-3 py-3 border-dashed border-2 border-[#d9d9d9]`}>
            <div className="flex flex-col items-center justify-center gap-3 min-h-[235px]">
                {value && 
                    <Image
                    src={value || ''}
                    alt="Image"
                    width={150}
                    height={180}
                    className='object-cover w-[150px] h-[180px]'
                />}
                {/* <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="180" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" id="mainIconPathAttribute"></path> <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" id="mainIconPathAttribute"></path> </svg>
                </div> */}
                <button type="button" className='w-[150px] py-2 border border-[#d9d9d9] hover:border-[#1890ff] hover:text-[#1890ff] outline-none c text-black font-extralight tracking-widest uppercase' onClick={handleButtonClick}>Upload File</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className='opacity-0 absolute top-[-9999px]'
                    onChange={onSaveFile}
                />
            </div>
        </div>
    );
};

export const InputSelect = ({ value = "", onChange, classBox = "", placeholder = "", options = [] }) => {
    return (
        <div className={`${classBox} cursor-pointer`}>
            <select value={value} onChange={(e) => onChange ? onChange(e.target.value) : {}} className={`cursor-pointer border-b-brown border-b px-1 py-3 outline-none w-full ${value ? 'text-brown': 'text-gray-400 focus:text-brown '}`}>
                {placeholder && <option value={null}>{placeholder}</option>}
                {options?.map((option, index) => (
                    <option key={"Option-" + index} value={option?.id}>{option?.name}</option>
                ))}
            </select>
        </div>
    );
};
