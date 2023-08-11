"use client";
import React from 'react'
import { useSelector } from 'react-redux'
import NavMember from './NavMember';

const Nav = ({ children }) => {
    const authValue = useSelector((state) => state.auth.value)

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