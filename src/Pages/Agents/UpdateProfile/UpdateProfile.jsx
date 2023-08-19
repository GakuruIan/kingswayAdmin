import React,{useState,useEffect} from 'react'
import { useFormik } from 'formik'
import { UpdateProfileSchema } from '../../../utils/yup'
import Preview from '../../../Component/Preview/Preview'

import BaseUrl from '../../../config/axiosConfig'
import Notify from '../../../Component/Notification/Notify'
import Loader from '../../../Component/Loader/Loader'

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'


const UpdateProfile = () => {


const [isFetching,setIsFetching] = useState(false);
const [isloading,setIsLoading] = useState(false);

const [photo,setPhoto] = useState({})

const {currentUser} = useSelector(state=>state.user)
const id = currentUser.user._id
const photo_Id = currentUser.user.photo.public_id
const {accesstoken} = currentUser

const onSubmit=(values,action)=>{
    setIsLoading(true)  
    const formData = new FormData()

    for (let value in values) {
        
        if(value === 'photo'){
               formData.append("photo", values[value][0]);
         }
        formData.append(value, values[value]);
      }

      if(formData.get('photo') === ''){
        formData.delete('photo')
      }

      BaseUrl.put(`/agent/update/${id}`,formData,{
        headers: {
            'Accept': "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization':'Bearer '+token
        }
      })
      .then(response=>{
        if(response.status === 200){
            setIsLoading(false)
            toast.success("Account updated successfully")
        }
      })
      .catch(err=>{
        setIsLoading(false)
        toast.error(err.message)
      })

  }

useEffect(()=>{
    setIsFetching(true)
    async function FetchData(){
       
        await BaseUrl.get(`/agent/${id}`)
        .then((response)=>{
            if(response.status === 200){
            // for loading
             setIsFetching(false)

            //  Intializing Formik values 
              const{fullname,IdNumber,phonenumber,email,photo} = response.data[0]
              setPhoto(photo)
              formik.setFieldValue("fullname", fullname);
              formik.setFieldValue("IdNumber", IdNumber);
              formik.setFieldValue("phonenumber", phonenumber);
              formik.setFieldValue("email", email);
            }
        })
        .catch(err=>{
            setIsFetching(false)
            toast.error(err.message)
        })
    }
    FetchData()
},[])



const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
        fullname:"",
        IdNumber:"",
        phonenumber:"",
        email:"",
        photo:'',
        Current_Image_Id:photo_Id
    },
    validationSchema:UpdateProfileSchema,
    onSubmit
})
  return (
    <>
    {/* Loader  */}
      {isFetching && <Loader text="Fetching Data..."/>}

      {isloading && <Loader text="Updating Account..."/>}

      {/* notification toast */}
      <Notify/>
         <div className=" px-2 md:px-0">
            <div className="bg-[#fff] px-2 py-4">
                <h1 className="text-xl mb-2">
                   Edit Agent Profile
                </h1>

                {/* current Image Preview  */}
                <h6 className="text-base mb-2">Current Image</h6>
                <div className="h-56 w-56 lg:h-96 lg:w-96">
                    <img src={photo.url} alt="" srcSet="" className='object-cover h-full w-full'/>
                </div>

                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base mb-2" htmlFor="fullname">
                            Fullname
                        </label>
                        <input name='fullname' value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="John Doe"/>
                        <span className={`mt-1 text-sm text-red-600 ${formik.errors.fullname && formik.touched.fullname ? 'block':'hidden'}`}>{formik.errors.fullname}</span> 
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base mb-2" htmlFor="Idnumber">
                             Id number
                        </label>
                        <input name='IdNumber' value={formik.values.IdNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Idnumber" type="text" placeholder="12346532"/>
                        <span className={`mt-1 text-sm text-red-600 ${formik.errors.IdNumber && formik.touched.IdNumber ? 'block':'hidden'}`}>{formik.errors.IdNumber}</span> 
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                        <div className="">
                            <label className="block text-gray-700 text-base mb-2" htmlFor="phno">
                              Phone number
                            </label>
                            <input name='phonenumber' value={formik.values.phonenumber} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phno" type="text" placeholder="254 74223455"/>
                            <span className={`mt-1 text-sm text-red-600 ${formik.errors.phonenumber && formik.touched.phonenumber ? 'block':'hidden'}`}>{formik.errors.phonenumber}</span> 
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-base mb-2" htmlFor="email">
                                 Email
                            </label>
                            <input name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Doe@gmail.com"/>
                            <span className={`mt-1 text-sm text-red-600 ${formik.errors.email && formik.touched.email ? 'block':'hidden'}`}>{formik.errors.email}</span> 
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 py-3">
                        <label className="block text-gray-700 text-base " htmlFor="username">
                                Agent Image
                        </label>
                    <div className="flex items-center w-full">

                        {
                                formik.values.photo === '' ? 
                                (
                                    <div className="flex items-center flex-col gap-4">
                                    <label htmlFor="dropzone-file" className="cursor-pointer bg-indigo-700 hover:bg-indigo-600 ">
                                        <div className=" px-4 py-2">
                                          <p className="text-base text-white">Change Image</p>
                                        </div>
                                        <input id="dropzone-file" type="file" name='photo' onChange={(e)=>formik.setFieldValue("photo", e.target.files)} className="hidden" />
                                    </label>
                                    <span className={`mt-1 text-sm text-red-600 ${formik.errors.photo && formik.touched.photo ? 'block':'hidden'}`}>{formik.errors.photo}</span> 
                                </div> 
                                )
                                :
                                <Preview file={formik.values.photo[0]}/>
                        }

                    </div> 
                </div>

                  <button type='submit' className="mt-2 px-2 py-2 w-full text-base hover:bg-[#396AFC] bg-[#2948FF] text-white">Update</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default UpdateProfile