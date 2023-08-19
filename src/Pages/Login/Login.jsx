import React,{useEffect} from 'react'
import { loginSuccess,loginFailure,loginStart } from '../../Redux/UserSlicer'

import { LoginSchema } from '../../utils/yup'
import {  useFormik } from 'formik'
import BaseUrl from '../../config/axiosConfig'
import { useNavigate } from "react-router-dom";
import Notify from '../../Component/Notification/Notify'
import { toast } from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'


const Login = () => {

const {currentUser} = useSelector(state=>state.user)
const navigate = useNavigate();

useEffect(()=>{
   if(currentUser){
      navigate('/dashboard')
   }
},[currentUser])


const dispatch = useDispatch()

const onSubmit =async(values,action)=>{

dispatch(loginStart())
await BaseUrl.post('/login',values,{
  headers: {
    'Content-Type':'application/json'
  }
})
.then(response=>{
if(response.status === 200){
  dispatch(loginSuccess(response.data))
}
})
.catch(err=>{
  toast.error("Invalid credentials")
  dispatch(loginFailure())
})
    action.resetForm()
}

const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:LoginSchema,
        onSubmit
})

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      {/* Nofitication  */}
        <Notify/>

        <div className="px-6 py-8 w-full md:w-96 bg-[#fff] shadow-lg">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-base mb-2" htmlFor="email">
                        Email
                    </label>
                    <input name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Doe@gmail.com"/>
                    <span className={`mt-1 text-sm text-red-600 ${errors.email && touched.email ? 'block':'hidden'}`}>{errors.email}</span> 
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-base mb-2" htmlFor="password">
                       Password
                    </label>
                    <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="password" placeholder="password"/>
                    <span className={`mt-1 text-sm text-red-600 ${errors.password && touched.password ? 'block':'hidden'}`}>{errors.password}</span> 
                </div>

                <button type='submit' className="mt-2 px-2 py-2 w-full text-base hover:bg-[#396AFC] bg-[#2948FF] text-white">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login