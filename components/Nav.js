"use client";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavMember from './NavMember';
import { inputAuth } from '@redux/authSlice';

const Nav = ({ children }) => {
    const authValue = useSelector((state) => state.auth.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if(authValue?.logIn === false){
            dispatch(inputAuth(getFromLocalStorage('auth')))
        }
    },[authValue])

    return (
        <React.Fragment>
            {!authValue?.Employee_Id ?
                <NavMember>{children}</NavMember>
            :
                <React.Fragment>{children}</React.Fragment>   
            }
        </React.Fragment>
    )
}

export default Nav