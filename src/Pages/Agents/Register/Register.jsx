import React,{useState,useEffect} from 'react'
import { RegisterSchema } from '../../../utils/yup'
import Preview from '../../../Component/Preview/Preview'
import BaseUrl from '../../../config/axiosConfig'

import {useFormik} from 'formik'
import Loader from '../../../Component/Loader/Loader'
import Notify from '../../../Component/Notification/Notify'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';

const Register = () => {
const navigate = useNavigate()
const {currentUser} = useSelector(state=>state.user)

const {accesstoken} = currentUser
const {isAdmin} = currentUser.user

const[loading,setLoading] = useState(false)

// ensuring only admin views the page
useEffect(()=>{

   if(!isAdmin){
     navigate('/dashboard')
   }

},[])

// submitting 
const onSubmit =(values,action)=>{
  setLoading(true);
  const formData = new FormData();

  const {confirmpassword,...formInfo} = values;

  for (let value in formInfo) {
    if(value === 'photo'){
           formData.append("photo", formInfo.photo[0]);
     }
    formData.append(value, values[value]);
  }

    BaseUrl.post('/register',formData,{
        headers: {
            'Accept': "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization':'Bearer '+accesstoken
        }
    })
    .then((response)=>{
        setLoading(false)
        toast.success("Agent Added successfully")
     })
    .catch(err=>{
        setLoading(false)
        toast.error("An Error occurred")
    })

        action.resetForm();
    }

const {values,errors,setFieldValue,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:{
            fullname:"",
            IdNumber:"",
            phonenumber:"",
            email:"",
            password:"",
            confirmpassword:"",
            photo:null
        },
        validationSchema:RegisterSchema,
        onSubmit
      })
    
  return (
    <div>
        <div className=" px-2 md:px-0">
            
            {/* loading */}
            {loading && (<Loader text="Registering ..."/>) }

            {/* notification Container */}
            <Notify/>


            <div className="bg-[#fff] px-2 py-4">
                <h1 className="text-xl mb-2">
                   Register Agent
                </h1>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base mb-2" htmlFor="fullname">
                            Fullname
                        </label>
                        <input name="fullname" value={values.fullname} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="E.g John Doe"/>
                        <span className={`mt-1 text-sm text-red-600 ${errors.fullname && touched.fullname ? 'block':'hidden'}`}>{errors.fullname}</span> 
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base mb-2" htmlFor="idnumber">
                           Id number
                        </label>
                        <input name='IdNumber' value={values.IdNumber} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="idnumber" type="text" placeholder="E.g 87542120"/>
                        <span className={`mt-1 text-sm text-red-600 ${errors.IdNumber && touched.IdNumber ? 'block':'hidden'}`}>{errors.IdNumber}</span> 
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                        <div className="">
                            <label className="block text-gray-700 text-base mb-2" htmlFor="phno">
                              Phone number
                            </label>
                            <input name='phonenumber' value={values.phonenumber} onChange={handleChange} onBlur={handleBlur}  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phno" type="text" placeholder="E.g 0780564793"/>
                            <span className={`mt-1 text-sm text-red-600 ${errors.phonenumber && touched.phonenumber? 'block':'hidden'}`}>{errors.phonenumber}</span> 
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-base mb-2" htmlFor="email">
                             Email
                            </label>
                            <input name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Doe@gmail.com"/>
                            <span className={`mt-1 text-sm text-red-600 ${errors.email && touched.email ? 'block':'hidden'}`}>{errors.email}</span> 
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                        <div className="">
                            <label className="block text-gray-700 text-base mb-2" htmlFor="password">
                              Password
                            </label>
                            <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                            <span className={`mt-1 text-sm text-red-600 ${errors.password && touched.password ? 'block':'hidden'}`}>{errors.password}</span> 
                        </div>
                        
                        <div className="">
                            <label className="block text-gray-700 text-base mb-2" htmlFor="confirmpassword">
                              Confirm Password
                            </label>
                            <input name='confirmpassword' value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="password" placeholder="confirm Password"/>
                            <span className={`mt-1 text-sm text-red-600 ${errors.confirmpassword && touched.confirmpassword ? 'block':'hidden'}`}>{errors.confirmpassword}</span> 
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 py-3">
                        <label className="block text-gray-700 text-base " htmlFor="username">
                                Agent Image
                        </label>
                        {
                            values.photo === null ? (
                                <div className="flex items-center justify-center w-full flex-col gap-4">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" name='photo' onChange={(e)=>setFieldValue("photo", e.target.files)} className="hidden" />
                                    </label>
                                    <span className={`mt-1 text-sm text-red-600 ${errors.photo && touched.photo ? 'block':'hidden'}`}>{errors.photo}</span> 
                                    </div> 
                            ) :
                            (<Preview file={values.photo[0]}/>)
                        }
                    
                </div>

                <button type="submit" className="mt-2 px-2 py-2 w-full text-base hover:bg-[#396AFC] bg-[#2948FF] text-white">Create </button>
                </form>
            </div>
        </div>
       
    </div>
  )
}

export default Register