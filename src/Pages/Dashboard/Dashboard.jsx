import React,{useEffect} from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Cards from '../../Component/Cards/Cards'
import { Outlet } from 'react-router-dom'

import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

const Layout = () =>{

  const {currentUser} = useSelector(state=>state.user)
  const navigate = useNavigate();

  useEffect(()=>{
    
      if(!currentUser){
        navigate('/')
      }

  },[currentUser])

  return <>
    <Navbar/>
    <div className="container mx-auto lg:px-2">
         <Cards/>
         <Outlet/>
       </div>
  </>
}

const Dashboard = () => {
  return (
    <div className='relative  w-full'>
      <Layout/>
    </div>
  )
}

export default Dashboard