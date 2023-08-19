import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

import Loader from '../../Component/Loader/Loader'
import Notify from '../../Component/Notification/Notify'
import { toast } from 'react-toastify';
import BaseUrl from '../../config/axiosConfig'
import {useNavigate} from 'react-router-dom'

import {useSelector} from 'react-redux'
 
const Listings = () => {

const {currentUser} = useSelector(state=>state.user)
const navigate = useNavigate()

const isAdmin = currentUser.user.isAdmin;

const token = currentUser.accesstoken;

const [loading,setLoading] = useState(false);
const [listings,setListings] = useState([]);
const [deleting,setDeleting] = useState(false);

useEffect(()=>{

   if(!isAdmin){
     navigate('/dashboard')
   }

   async function FetchData(){
     await BaseUrl.get('/properties')
     .then((response)=>{
        if(response.status === 200){
          setLoading(false)
          setListings(response.data)
        }
     })
     .catch(err=>{
         setLoading(false)
         toast.error("Couldnt fetch data")
     })
   }

   FetchData()
},[])

const handleDelete=async(id)=>{
  setDeleting(true)
  await BaseUrl.delete(`property/delete/${id}`,{
    headers:{
      'Authorization' : "Bearer "+token
    }
  })
  .then((response)=>{
    if(response.status === 200){
      setDeleting(false)
      toast.success("Property deleted successfully")
    }
  })
  .catch((err)=>{
    setDeleting(false)
    toast.error("Couldn't delete Property")
  })
}

if(listings.length === 0)
    return;

  return (
    <div className='mt-5'>

      {/* Notification toast */}
      <Notify/>

      {/* Loader */}
      {loading && <Loader text="Fetching Data..."/>}


      {/*Deleting Loader */}
      {deleting && <Loader text="Deleting Data..."/>}

      <div className="bg-[#fff] flex justify-between items-center w-full py-2 px-2 mb-4">
            <h1 className="text-base ">Properties</h1>  
            {
              isAdmin && (
                <Link to="/dashboard/create" className='flex items-center justify-between gap-2 px-4 bg-green-600 hover:bg-green-700 text-white py-2'>
                  Create
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </Link>
              )
            }  
           
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {
          listings.map((listing)=>{
              return   <div key={listing._id} className="bg-white">
              
              <img className="object-cover  h-44 w-full" src={listing.photos[0]?.url} alt="" />

              <div className="border px-1 pt-2 pb-4">
              <div className="flex justify-between">
                  <Link to={`/dashboard/update/${listing._id}`} className="mb-1 text-base tracking-tight text-gray-900 hover:underline">{listing.name}</Link>
              </div>
              <div className="flex justify-between mb-2">
                  <h6 className="text-sm text-gray-700">Price:</h6>
                  <h6 className="text-sm text-gray-700">{listing.price}</h6>
              </div>

              <div className="flex justify-between mb-2">
                  <h6 className="text-sm text-gray-700">Location:</h6>
                  <h6 className="text-sm text-gray-700">{listing.location}</h6>
              </div>
              <div className="flex justify-between mb-2">
                  <h6 className="text-sm text-gray-700">Property:</h6>
                  <h6 className="text-sm text-gray-700">{listing.type}</h6>
              </div>
              <div className="flex gap-2 mt-2">

              {
                isAdmin && ( <Link to={`/dashboard/update/${listing._id}`} className='flex items-center justify-center gap-2 px-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 w-full'>
                Edit
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Link>)
              }
                
              {
                isAdmin && (
                  <button onClick={()=>handleDelete(listing._id)} className='flex items-center justify-center gap-2 px-2 bg-[#F00000] hover:bg-[#DC281E] text-white py-2 w-full'>
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
          })
        }

           {/* Card */}
         
          {/* Card */}

          </div>
    </div>
  )
}

export default Listings