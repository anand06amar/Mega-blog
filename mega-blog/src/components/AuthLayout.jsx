import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'


export default function AuthLayout({children,authentication}) {
    const [loader,setLoader] = useState("")
    const navigate = useNavigate()
    const authstatus = useSelector(state => state.auth.status)
    useEffect(() => {
      if(authentication && authstatus!==authentication){
        navigate("/login")
      }
      else if(!authentication && authstatus !==authentication){
        navigate("/")
      }
    setLoader(false)
     
    }, [authstatus, navigate , authentication])
    
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

