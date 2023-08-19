import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import BaseUrl from '../../../config/axiosConfig'

import Notify from '../../../Component/Notification/Notify'
import Loader from '../../../Component/Loader/Loader'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

import {useSelector} from 'react-redux'

const Agents = () => {

  const {currentUser} = useSelector(state=>state.user)

  const {accesstoken} = currentUser
  const navigate = useNavigate()

  const isAdmin = currentUser.user.isAdmin

const [Agents,setAgents] =useState([])
const [Loading,setLoading] = useState(false)
const [Deleting,setDeleting] =useState(false)

 useEffect(()=>{

   if(!isAdmin){
      navigate('/dashboard')
   }

     setLoading(true)
    async function FetchData(){
      await BaseUrl.get('/agents',{
        headers:{
          'Authorization':'Bearer '+accesstoken
        }
      })
      .then((response)=>{
        setAgents(response.data)
        setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
        toast.error("An error Occured")
      })
    } 

    FetchData()
 },[])

const handleDelete=async(id)=>{
   setDeleting(true)
   await BaseUrl.delete(`/agent/delete/${id}`,{
    headers:{
      'Authorization':'Bearer '+accesstoken
    }
   })
   .then((response)=>{
      if(response.status === 200){
        setDeleting(false)
        toast.success("Agent Deleted Successfully")
      }
   })
   .catch((err)=>{
    setDeleting(false)
    toast.error("Couldnt Delete Agent")
   })
}

  return (
    <>
          {/* Notification */}
           <Notify/>

           {/* Loading */}
           {Loading && <Loader text="Fetching Data...."/>}

           {/* Deleting */}
           {Deleting && <Loader text="Deleting Data...."/>}
           
          <div className=" px-2 md:px-0">
              <div className="bg-[#fff] flex justify-between items-center w-full py-2 px-2 mb-4">
                <h1 className="text-base ">Agents</h1>    


                <Link to="/dashboard/register" className='flex items-center justify-between gap-2 px-4 bg-green-600 hover:bg-green-700 text-white py-2'>
                        Create
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                </Link>
              </div>

              <div className="px-2 pb-4"> 
            <div className="relative overflow-x-auto py-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="border-b border-gray-200 py-2 text-base text-white  bg-gray-600">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-light">
                                Fullname
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                                  Email
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                                Id Number
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                               IsAdmin
                            </th>
                            <th scope="col" className="px-6 py-3 font-light text-center">
                               Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      Agents.map((Agent)=>{
                          return <tr key={Agent._id} className="bg-white border-b border-gray-300">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {Agent.fullname}
                            </th>
                            <td className="px-6 py-4">
                                {Agent.email}
                            </td>
                            <td className="px-6 py-4">
                               {Agent.IdNumber}
                            </td>
                            <td className="px-6 py-4">
                               {Agent.phonenumber}
                            </td>
                            <td className="px-6 py-4">
                               <span className={`px-4 py-2 ${Agent.isAdmin ? 'bg-green-300 text-green-600' : 'bg-yellow-300 text-yellow-600' }`}>{Agent.isAdmin ? 'Admin': 'Not Admin'}</span>
                            </td>
                            <td className="px-6 py-4 flex gap-2">

                                <Link to={`/dashboard/Agent/${Agent._id}`} className='flex items-center justify-center gap-2 px-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 w-full'>
                                   View
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>

                                  </Link>

                                <button onClick={()=>handleDelete(Agent._id)} className='flex items-center justify-center gap-2 px-2 bg-[#F00000] hover:bg-[#DC281E] text-white py-2 w-full'>
                                  Delete
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                </button>
                            </td>
                            </tr>
                        })
                      }
                    </tbody>
                </table>
            </div>

        </div>
         </div>
    </>
  )
}

export default Agents