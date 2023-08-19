import React,{useState,useEffect} from 'react'

import Notify from '../../../Component/Notification/Notify'
import BaseUrl from '../../../config/axiosConfig'
import Loader from '../../../Component/Loader/Loader'
import { toast } from 'react-toastify';
import { useFormik } from "formik";

import {useParams,useNavigate} from 'react-router-dom'
import { UpdatePropertySchema } from '../../../utils/yup';
import MultipleImage from '../../../Component/MultiplePreview/MultipleImages'

import {useSelector} from 'react-redux'



const UpdateProperty = () => {
  const id = useParams().id

  const navigate = useNavigate()
   
  const {currentUser} = useSelector(state=>state.user)

  const token = currentUser.accesstoken;

  const {isAdmin} = currentUser.user

  const[loading,setLoading] = useState(false)
  const[listing,setListing] = useState([])

const onSubmit=(values,action)=>{
    setLoading(true);
  
    const formData = new FormData();
  
    for (let value in values) {
      if(value === 'photos'){
         let images = Array.from(values.photos)
          for (let i = 0; i < images.length; i++) {
             formData.append("photos", images[i]);
           }
       }
      formData.append(value, values[value]);
    }
    
    if(formData.get('photos') === ''){
      formData.delete('photos')
    }
  
    BaseUrl.put(`/property/update/${id}`,formData,{
      headers: {
        'Accept': "application/json",
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+token
    }
    }).then((response)=>{
      if(response.status === 200){
        setLoading(false)
        toast.success("Property Updated successfully")
      }
    })
    .catch(err=>{
      setLoading(false)
      toast.error("Couldnt Update Property")
      console.log(err)
    })
  
  }
  // use formik
const formik = useFormik({
    enableReinitialize: true,
      initialValues:{
        name:"",
        location:"",
        price:"",
        type:"",
        photos:'',
    },
    validationSchema: UpdatePropertySchema,
    onSubmit,
});

useEffect(()=>{

  if(!isAdmin){
    navigate('/dashboard')
  }
  
      async function FetchData(){
        await  BaseUrl.get(`property/${id}`)
        .then(response=>{
           if(response.status ===200){
              setLoading(false)
              //intializing Formik values
              const {name,location,price,type} = response.data;
              formik.setFieldValue("name", name);
              formik.setFieldValue("location", location);
              formik.setFieldValue("price", price);
              formik.setFieldValue("type",type)

              setListing(response.data)
           }
        })
        .catch(err=>{
           setLoading(false)
        })
      }

      FetchData()
  },[])



if(listing.length>0){
  return;
}

  return (
    <div>
       <div>
      {/* notification Toast */}
       <Notify/>

       {/* Loader */}
       {loading && <Loader text="Updating Property.."/>}

       <div className=" px-2 md:px-0">
          <div className="bg-[#fff] px-2 py-4">
            <h1 className="text-xl mb-4">
              Update property
            </h1>
            
            <h6 className="text-base mb-2">Property Images</h6>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-2">
                  {
                    listing.photos?.map((image,index)=>{
                    return <div key={index} className="w-full h-full md:h-full">
                              <img src={image.url} alt="" srcSet="" className='object-cover h-52 w-full'/>
                            </div>  
                      })
                  }
              </div>

            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
    
               

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                <div className="">
                      <label className="block text-gray-700 text-base mb-2" htmlFor="name">
                          Property name 
                      </label>
                      <input name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="E.g Doe Apartments"/>
                      <span className={`mt-1 text-sm text-red-600 ${formik.errors.name && formik.touched.name ? 'block':'hidden'}`}>{formik.errors.name}</span> 
                  </div>
                  <div className="">
                      <label className="block text-gray-700 text-base mb-2" htmlFor="location">
                        Property Location
                      </label>
                      <input name='location' value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="E.g Nairobi"/>
                      <span className={`mt-1 text-sm text-red-600 ${formik.errors.location && formik.touched.location ? 'block':'hidden'}`}>{formik.errors.location}</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                 <div className="">
                      <label className="block text-gray-700 text-base mb-2" htmlFor="location">
                        Property Price
                      </label>
                      <input name='price' value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="number" placeholder="Ksh 120,000"/>
                      <span className={`mt-1 text-sm text-red-600 ${formik.errors.price && formik.touched.price ? 'block':'hidden'}`}>{formik.errors.price}</span>
                  </div>
                  <div className="">
                      <label className="block text-gray-700 text-base mb-2" htmlFor="type">
                        Property Type
                      </label>
                      <select name='type' value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" type="text" placeholder="location">
                        <option value="villa" defaultValue>Villa</option>
                        <option value="land">Land</option>
                      </select>
                      <span className={`mt-1 text-sm text-red-600 ${formik.errors.type && formik.touched.type ? 'block':'hidden'}`}>{formik.errors.type}</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-4 py-3">
                  <label className="block text-gray-700 text-base " htmlFor="images">
                         Change Images
                      </label>
                      {
                        formik.values.photos === '' ? 
                        ( 
                          <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" name='photos' multiple onChange={(e)=>formik.setFieldValue("photos", e.target.files)} className="hidden" />
                            </label>
                        </div> 
                      ) :
                        (<MultipleImage files={formik.values.photos}/>)
                      }
                 
                </div>
                
                <button type='submit' className="mt-2 px-2 py-2 w-full text-base hover:bg-[#396AFC] bg-[#2948FF] text-white">Update </button>
            </form>
          </div>
       </div>
    </div>
    </div>
  )
}

export default UpdateProperty