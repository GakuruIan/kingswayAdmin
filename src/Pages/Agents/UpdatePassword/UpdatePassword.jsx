import React from 'react'
import { PasswordSchema } from '../../../utils/yup'
import { useFormik } from 'formik'

const UpdatePassword = () => {

const onSubmit =(values,action)=>{
  console.log(values)
  action.resetForm()
}

const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:{
            password:"",
            confirmpassword:""
        },
        validationSchema:PasswordSchema,
        onSubmit
})

  return (
    <div className=" px-2 md:px-0">
    <div className="bg-[#fff] px-2 py-4">
        <h1 className="text-xl mb-2">
           Change Password
        </h1>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 py-3">
                <div className="">
                    <label className="block text-gray-700 text-base mb-2" htmlFor="password">
                      Password
                    </label>
                    <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password"/>
                    <span className={`mt-1 text-sm text-red-600 ${errors.password && touched.password ? 'block':'hidden'}`}>{errors.password}</span> 
                </div>
                
                <div className="">
                    <label className="block text-gray-700 text-base mb-2" htmlFor="confirmpassword">
                      Confirm Password
                    </label>
                    <input name='confirmpassword' value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="password" placeholder="confirm password"/>
                    <span className={`mt-1 text-sm text-red-600 ${errors.confirmpassword && touched.confirmpassword ? 'block':'hidden'}`}>{errors.confirmpassword}</span> 
                </div>
            </div>
          <button type='submit' className="mt-2 px-2 py-2 w-full text-base hover:bg-[#396AFC] bg-[#2948FF] text-white">Update Password</button>
        </form>
    </div>
</div>
  )
}

export default UpdatePassword