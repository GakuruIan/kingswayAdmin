import React,{useState} from 'react'
import {Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../../Redux/UserSlicer'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const [open,setOpen] =useState(false)


const {currentUser} = useSelector(state=>state.user)
const {fullname} = currentUser.user

const handleLogout =()=>{
    dispatch(logout())
    navigate('/')
}

  return (
    <div className='py-4 z-40 bg-[#fff] fixed top-0 left-0 w-full '>
       <div className=" container mx-auto flex justify-between items-center px-2">
          <Link to="/dashboard">Kingsway Realty</Link>

          <div className="relative">
              <button onClick={()=>setOpen(!open)} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="font-medium rounded-lg text-base px-4 py-2 text-center inline-flex items-center gap-2 text-gray-700" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                 {fullname}
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div id="dropdownDelay" className={`absolute z-10 divide-y divide-gray-100 rounded-lg shadow md:w-44 bg-gray-700 ${open ? 'block':'hidden'}`}>
                <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownDelayButton">
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/change-password" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Change Password</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/update-profile" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Update Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block px-4 py-2 w-full text-left hover:bg-gray-600 hover:text-white">Sign out</button>
                  </li>
                </ul>
             </div>

          </div>
       </div>
    </div>
  )
}

export default Navbar