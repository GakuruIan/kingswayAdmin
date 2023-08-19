import React,{useState,useEffect} from 'react'

import BaseUrl from '../../../config/axiosConfig'

import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Loader from '../../../Component/Loader/Loader';
import Notify from '../../../Component/Notification/Notify';

import { useSelector } from 'react-redux';

const AgentProfile = () => {
    const id = useParams().id;
    const navigate = useNavigate()

    const {currentUser} = useSelector(state=>state.user)

    const {accesstoken}  = currentUser
    const {isAdmin} = currentUser.user



    const[Agent,setAgent] = useState([]);
    const [Loading,setLoading] = useState(false)
    const [Deleting,setDeleting] =useState(false)
    
    useEffect(()=>{

        async function FetchData(){
            await BaseUrl.get(`/agent/${id}`,{
                headers:{
                    'Authorization': 'Bearer '+accesstoken
                }
            })
            .then((response)=>{
                if(response.status === 200){
                    setAgent(response.data)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }

        FetchData()
    },[])

const handleDelete=async(id)=>{
    setDeleting(true)
    await BaseUrl.delete(`/agent/delete/${id}`,{
        headers:{
            'Authorization': 'Bearer '+accesstoken
        }
    })
    .then((response)=>{
        if(response.status === 200){
            setDeleting(false)
            toast.success("Agent Deleted Successfully")
            navigate('/dashboard/Agents')
        }
    })
    .catch((err)=>{
        setDeleting(false)
        toast.error("Couldnt Delete Agent")
        console.log(err)
    })
}
if(Agent.length === 0){
    return;
}

  return (
        <div className=" px-2 md:px-0">

            {/* loading */}
            {Loading && <Loader text="Fetching Data..."/>}

            {/* Delete */}
            {Deleting && <Loader text="Deleting"/>}

            {/* notification toast */}
             <Notify/>

            <div className="bg-[#fff] px-2 py-4">
                <h1 className="text-xl md:text-2xl mb-2">Agents Profile</h1>
            
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="h-full w-full lg:h-96 lg:w-96">
                            <img src={Agent[0]?.photo.url} alt="" srcSet="" className='object-cover h-full w-full'/>
                        </div>

                        <div className="">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">

                                <div className="">
                                    <label className="block text-gray-700 text-base mb-2" htmlFor="password">
                                    Fullname
                                    </label>
                                    <input name='fullname' value={Agent[0]?.fullname}  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" disabled/>
                                
                                </div>
                            
                                <div className="">
                                    <label className="block text-gray-700 text-base mb-2" htmlFor="confirmpassword">
                                      Email
                                    </label>
                                    <input name='email' value={Agent[0]?.email}  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="text" disabled/>
                                    
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">

                                <div className="">
                                    <label className="block text-gray-700 text-base mb-2" htmlFor="password">
                                        ID number
                                    </label>
                                    <input name='fullname' value={Agent[0]?.IdNumber}  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" disabled/>
                                
                                </div>
                            
                                <div className="">
                                    <label className="block text-gray-700 text-base mb-2" htmlFor="confirmpassword">
                                        Phone number
                                    </label>
                                    <input name='IdNumber' value={Agent[0]?.phonenumber}  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="text" disabled/>
                                    
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                               <div className="">
                                    <label className="block text-gray-700 text-base mb-2" htmlFor="confirmpassword">
                                        Agent ID
                                    </label>
                                    <input name='IdNumber' value={Agent[0]._id} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="text" disabled/>
                                    
                                </div>

                                <div className="">
                                    <label className="block text-gray-700 text-base mb-4" htmlFor="password">
                                        Admin Status
                                    </label>
                                    <span className={`px-4  py-2 ${Agent[0]?.isAdmin ? 'bg-green-300 text-green-600' : 'bg-yellow-300 text-yellow-600' }`}>{Agent[0]?.isAdmin ? 'Admin': 'Not Admin'}</span>
                                </div>
                            </div>
                            {
                                isAdmin && (
                                    <button onClick={()=>handleDelete(Agent[0]?._id)} className='my-4 flex items-center justify-center gap-2 px-2 bg-[#F00000] hover:bg-[#DC281E] text-white py-2 w-full'>
                                        Delete
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                     </button>
                                )
                            }
                           
                        </div>
                </div>
             </div>
        </div>
  )
}

export default AgentProfile